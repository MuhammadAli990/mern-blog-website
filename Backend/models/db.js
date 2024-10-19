import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Database connected succesfully')
    }
    catch(err){
        console.log('Error connecting database',err);
    }
}
connectDb();