const express =require("express");
const cors=require("cors");
const { Connection } = require("./Config/db");
const { userModel } = require("./Model/UserModel");

const app=express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const PORT=process.env.PORT||8000;

app.get("/user",async(req,res)=>{
    const Users= await userModel.find({}).sort({score:-1});
    res.send(Users);
})

app.post("/user",async(req,res)=>{
    const{name,score}=req.body;
    const newuser= new userModel({
        name:name,
        score:score
    })
    await newuser.save();
    res.send("Scores Added Successfully");
})

app.listen(PORT,async()=>{
     try{
        await Connection;
        console.log("connection to DB successfull")
    }
    catch(err){
       console.log("error in connecting to DB");
       console.log(err)
    }
    console.log(`listening to port ${PORT}`);
})