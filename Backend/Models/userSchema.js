const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    Name:{
        type:String
    },
    Phone_no:{
        type:Number,
        minLength:10
    },
    email:{
        type:String
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    location:{
        type:String
    },
    area:{
        type:Number
    },
    crop:{
        type:String
    }
},{
    timestamps: true 
})

const User=mongoose.model("User",userSchema)

module.exports=User