import dotenv from "dotenv"
import express from "express"
import mongodb, { ObjectId } from "mongodb"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import twilio from "twilio"
import authenticateToken from "./middleware/authenticateToken.js"


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

        return response.status(401).json({error: "Invalid credentials"})


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

            const isExists = await db.collection("users").findOne({
                phone_number: phoneNumber,
            })

            if(isExists){
                return response.status(400).json({error:"User with such phone number already exists"})
            }
           
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)) 

            const user = {
                first_name:firstName,
                last_name:lastName,
                phone_number:phoneNumber,
                password:hashedPassword,
                role:"user",
                description:""
            }

            await db.collection("users").insertOne(user)


            const {password:userPassword, ...userNotSensibleData} = user
            const token = jwt.sign({user:userNotSensibleData}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})

            return response.status(200).json({token})
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



// Requests
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

app.post("/api/actnow/requests", async(request, response)=>{
    try{
        const {title,needs,goal,category,description, author, location} = request.body
        const newRequest = {
            title,
            needs,
            goal,
            category,
            description,
            author,
            location
        }

        await db.collection("requests").insertOne(newRequest)

        return response.status(200).json({message:"New request was successfully created"})
    }catch(error){
        return response.status(500).json({message:"Internal Server Error"})
    }
})

const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
