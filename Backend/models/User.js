import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    followers:{
        type:Number,
        default:0
    }
})

export const userModel = mongoose.model('user',userSchema);

