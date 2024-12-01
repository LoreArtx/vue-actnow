import dotenv from "dotenv"
import express from "express"
import mongodb, { ObjectId } from "mongodb"
import cors from "cors"
import bcrypt from "bcrypt"
import multer from "multer"
import twilio from "twilio"

const app = express();
app.use(cors());
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

app.post('/api/actnow/sms-verify', async (request, response) =>{
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
        
        return response.status(404).json({error:'Unknown Error'})
    }catch(error){
        console.log(error)
        return response.status(500).json({meerrorssage:'Internal Server Error'})
    }
})

app.post('/api/actnow/code-check', async(request, response)=>{
    try{
        const {code, phoneNumber} = request.body

        const verificationCheck = await clientTwilio.verify.v2.services(process.env.VERIFY_SERVICE_SID).verificationChecks.create({code,to:phoneNumber})

        if(verificationCheck.status === 'approved')
            return response.status(200).json({status:verificationCheck.status})

        return response.status(404).json({error:"Invalid code"})
    }catch(error){
        console.log(error)
        return response.status(500).json({error:'Internal Server Error'})
    }
})


// USER
app.post("/api/actnow/sign-in", async (request, response) => {
    try {
        const { phoneNumber, password } = request.body;

        if (!phoneNumber || !password) {
            return response.status(400).json({ error: "Phone number and password are required" });
        }

        const hashBodyPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10))

        console.log(hashBodyPassword)

        const user = await db.collection("users").findOne({
            phone_number: phoneNumber,
        });

        if (user) {
            const isMatch = await bcrypt.compare(user.password, hashBodyPassword)
            if(isMatch)
                return response.status(200).json({ user: user });

            return response.status(401).json({error: "Invalid password"})
        } else {
            return response.status(401).json({ error: "Invalid phone number or password" });
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        return response.status(500).json({ error: "Internal server error" });
    }

});

app.post("/api/actnow/sign-up", async (request, response) =>{
        try {
            const {firstName, lastName, phoneNumber, password } = request.body

            if(!firstName, !lastName, !phoneNumber, !password){
                return response.status(400).json({error:"Nothing can be empty"})
            }

            const user = {
                first_name:firstName,
                last_name:lastName,
                phone_number:phoneNumber,
                password:password,
                role:"user",
                description:""
            }

            await db.collection("users").insertOne(user)

            return response.status(200).json({message:"Successfully created user"})
        } catch (error) {
            return response.status(500).json({ message: "Internal Server Error" });
        }
})

app.get("/api/actnow/checkNumber", async (request, response) =>{
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



// Needs
app.get("/api/actnow/requests", async(request, response)=>{
    try {
        const needs = await db.collection("requests").find({}).toArray();
        return response.status(200).json(needs);
    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error" });
    }
})

    app.get("/api/actnow/requests/:id", async(request, response)=>{
        const id = request.params.id
        try{
            const need = await db.collection("requests").findOne({_id:new ObjectId(id)})

            if(!need)
                return response.status(404).json({message:"Need was not found"})

            return response.status(200).json({need})
        }catch(error){
            return response.status(500).json({message:"Internal Server Error"})
        }
})

const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
