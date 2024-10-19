import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        blogId:{
            type:String,
            required:true
        },
        blogBy:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const commentModel = mongoose.model('comment',commentSchema)