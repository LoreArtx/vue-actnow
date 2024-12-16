import dotenv from "dotenv"
import express from "express"
import mongodb, { ObjectId } from "mongodb"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import twilio from "twilio"
// import authenticateToken from "./middleware/authenticateToken.js"


const app = express();
app.use(cors({origin:["http://localhost:3000", "http://localhost:5173"],credentials:true}));
app.use(express.json());
dotenv.config();




let db;


mongodb.MongoClient.connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(process.env.DATABASE_NAME);
        console.log("Connected to database:", process.env.DATABASE_NAME);
    })
    .catch(error => console.error("Database connection error:", error));


// twilio
const clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

app.post('/api/sms-verify', async (request, response) =>{
    try{
        const {phoneNumber} = request.body
        const verification = await clientTwilio.verify.v2
        .services(process.env.VERIFY_SERVICE_SID)
        .verifications.create({
        channel: "sms",
        to: phoneNumber,
        });

        if(verification.status === 'pending')
            return response.status(200).json({status:verification.status})
        
        return response.status(404).json({message:'Unknown Error'})
    }catch(error){
        console.log(error)
        return response.status(500).json({meerrorssage:'Internal Server Error'})
    }
})

app.post('/api/code-check', async(request, response)=>{
    try{
        const {code, phoneNumber} = request.body

        const verificationCheck = await clientTwilio.verify.v2.services(process.env.VERIFY_SERVICE_SID).verificationChecks.create({code,to:phoneNumber})

        if(verificationCheck.status === 'approved')
            return response.status(200).json({status:verificationCheck.status})

        return response.status(404).json({message:"Invalid code"})
    }catch(error){
        console.log(error)
        return response.status(500).json({message:'Internal Server Error'})
    }
})


// USER
app.post("/api/sign-in", async (request, response) => {
    try {
        const { phoneNumber, password } = request.body;

        if (!phoneNumber || !password) {
            return response.status(400).json({ error: "Phone number and password are required" });
        }

        const user = await db.collection("users").findOne({
            phone_number: phoneNumber,
        });

        if(!user){
            return response.status(401).json({ error: "Invalid phone number or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch)
        {
            const {password, ...userNotSensibleData} = user
            const token = jwt.sign({user:userNotSensibleData}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})

            return response.status(200).json({token})
        }

        return response.status(401).json({message: "Invalid credentials"})


    } catch (error) {
        console.error("Error during sign-in:", error);
        return response.status(500).json({ error: "Internal server error" });
    }

});

app.post("/api/sign-up", async (request, response) =>{
        try {
            const {firstName, lastName, phoneNumber, password } = request.body

            if(!firstName, !lastName, !phoneNumber, !password){
                return response.status(400).json({message:"Nothing can be empty"})
            }

            const isExists = await db.collection("users").findOne({
                phone_number: phoneNumber,
            })

            if(isExists){
                return response.status(400).json({message:"User with such phone number already exists"})
            }
           
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)) 

            const user = {
                first_name:firstName,
                last_name:lastName,
                phone_number:phoneNumber,
                password:hashedPassword,
                role:"user",
                description:"",
                location:{
                    streetName:"",
                    coordinates:{
                        lat:0,
                        lng:0
                    }
                },
                organization:""
            }

            await db.collection("users").insertOne(user)


            const {password:userPassword, ...userNotSensibleData} = user
            const token = jwt.sign({user:userNotSensibleData}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})

            return response.status(200).json({token})
        } catch (error) {
            return response.status(500).json({ message: "Internal Server Error" });
        }
})

app.get("/api/checkNumber", async (request, response) =>{
    try {
        const phoneNumber = request.query.phoneNumber

        const user = await db.collection("users").findOne({phone_number:phoneNumber})

        if(user)
            return response.status(409).json({message:"Account with such phone number already exists"})

        return response.status(200).json({message:"Account was successfully created"})
    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/api/users", async (request, response) => {
    try {
        const users = await db.collection("users").find().toArray();

        if (!users || users.length === 0) {
            return response.status(404).json({ error: "No users found" });
        }

        const usersWithNoPasswords = users.map(u=>{
            const {password, ...protectedUser} = u
            return protectedUser
        })

        return response.status(200).json({users:usersWithNoPasswords});
    } catch (error) {
        console.error("Error fetching users:", error);
        return response.status(500).json({ error: "Internal server error" });
    }
});


app.patch("/api/user/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;

        // const token = request.headers.authorization?.split(" ")[1];

        if (!id) {
            return response.status(400).json({ message: "User ID is required" });
        }

        if (!ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Invalid User ID" });
        }

        const updateFields = {};
        for (const key in updates) {
            if (updates[key] !== undefined && updates[key] !== null) {
                updateFields[key] = updates[key];
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ message: "No valid fields to update" });
        }

        if (updateFields.organization) {
            const organizationExists = await db.collection("users").findOne({
                organization: updateFields.organization
            });

            if (organizationExists) {
                return response.status(400).json({ 
                    message: `Organization '${updateFields.organization}' already exists`
                });
            }
        }

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );


        if (result.matchedCount === 0) {
            return response.status(404).json({ message: "User not found" });
        }

        const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(id) });
        const {password, ...userNotSensibleData} = updatedUser
        const token = jwt.sign({ user: userNotSensibleData }, process.env.JWT_SECRET, { expiresIn: "1h" });


        return response.status(200).json({ message: "User updated successfully", token });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete("/api/user/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!id) {
            return response.status(400).json({ message: "User ID is required" });
        }

        // const token = request.headers.authorization?.split(" ")[1];

        if (!ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Invalid User ID" });
        }

        const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "User not found" });
        }

        return response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
});





// Requests
app.get("/api/requests", async(request, response)=>{
    try {
        const requests = await db.collection("requests").find({}).toArray();
        return response.status(200).json({requests});
    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/api/requests/:id", async(request, response)=>{
        const id = request.params.id
        try{
            const request = await db.collection("requests").findOne({_id:new ObjectId(id)})

            if(!request)
                return response.status(404).json({message:"Request was not found"})

            return response.status(200).json({request})
        }catch(error){
            return response.status(500).json({message:"Internal Server Error"})
        }
})

app.post("/api/requests", async(request, response)=>{
    try{

        const {title,needs,goal,category,description, author, location, collected} = request.body

        const existingRequest = await db.collection("requests").findOne({ author });

        if (existingRequest) {
            return response.status(400).json({ message: "This organization already has an existing request." });
        }

        const newRequest = {
            title,
            needs,
            goal,
            category,
            description,
            author,
            location,
            collected
        }

        const result = await db.collection("requests").insertOne(newRequest);

        return response.status(200).json({message:"New request was successfully created", id:result.insertedId})
    }catch(error){
        return response.status(500).json({message:"Internal Server Error"})
    }
})

app.patch("/api/requests/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;

        // const token = request.headers.authorization?.split(" ")[1];

        if (!id) {
            return response.status(400).json({ message: "Request ID is required" });
        }

        if (!ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Invalid request ID" });
        }

        const updateFields = {};
        for (const key in updates) {
            if (updates[key] !== undefined && updates[key] !== null) {
                updateFields[key] = updates[key];
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return response.status(400).json({ message: "No valid fields to update" });
        }

        const result = await db.collection("requests").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return response.status(404).json({ message: "Request not found" });
        }

        return response.status(200).json({ message: "Request updated successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete("/api/requests/:id", async (request, response) => {
    try {
        const { id } = request.params;

        // const token = request.headers.authorization?.split(" ")[1];

        if (!id) {
            return response.status(400).json({ message: "Request ID is required" });
        }

        if (!ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Invalid request ID" });
        }

        const result = await db.collection("requests").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "Request not found" });
        }

        return response.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        console.error("Error deleting request:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
});


const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
