import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },
    likedBy: {
        type: String,
        required: true
    },
    blogBy: {
        type: String,
        required: true
    }
    },
    {
        timestamps: true
    }
)

export const likeModel = mongoose.model('like', likeSchema);