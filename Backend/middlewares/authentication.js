import { userModel } from "../models/User.js";

export const validateRegistration = async(req,res,next)=>{
    const {username,email} = req.body;
    const result = await userModel.findOne({username});
    if(result){
        return res.status(403).json({success:false,message:"Username already exists."})
    }
    const result2 = await userModel.findOne({email});
    if(result2){
        return res.status(403).json({success:false,message:"E-mail already registered."})
    }
    next();
}
