const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://aaryanbvp:aaryan142003@cluster0.qiw3qi7.mongodb.net/Farmer-app")
}

//returns promise  
module.exports=connectDB