import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import './models/db.js'
import { userModel } from './models/User.js'
import { validateRegistration } from './middlewares/authentication.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import { rename } from 'fs'
import { blogModel } from './models/Blog.js'
import { ObjectId } from 'bson'
import { commentModel } from './models/Comment.js'
import { likeModel } from './models/like.js'
import bcrypt from 'bcrypt'

const app = express()
const port = 3000
dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const upload = multer({ dest: 'uploads/' });
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.post('/register', validateRegistration, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userModel.create({ username, email, password:hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'Account Registered', success: true })
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error.', success: false })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
        const result = await userModel.findOne({ email });
        if(!result){
            return res.status(401).json({ message: "Incorrect email or password.", success: false })
        }
        const user = await bcrypt.compare(password,result.password);
        if (user) {
            jwt.sign({ username: result.username, id: result._id }, process.env.SECRET_KEY, {}, (_, token) => {
                return res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                }).status(200).json({ message: 'Logged in successfully.', success: true });
            })
        }
        else {
            return res.status(401).json({ message: "Incorrect email or password.", success: false })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false })
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
        if (err) {
            return res.json(false);
        }
        return res.json(info);
    })
})

app.post('/uploadBlog',upload.single('thumbnail'), async (req, res) => {
    const { originalname, filename, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    rename(path, path + '.' + ext, (err) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Image upload error", success: false })
        }
    });
    const { token } = req.cookies;
    const { title, summary, content, category } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
        if (err) {
            return res.json({ message: "Login to upload blogs.", success: false });
        }
        try {
            const newBlog = await blogModel.create({ username: info.username, title, summary, content, category, thumbnail: filename + '.' + ext })
            await newBlog.save();
            res.json({ message: "Blog uploaded successfully", success: true })
        }
        catch (err) {
            return res.status(500).json({ message: 'Server Error', success: false, err })
        }
    })
})

app.post('/getBlogsByCategory', async (req, res) => {
    const { category,skip } = req.body;
    if (category == "Latest") {
        try{
            const blogsFound = await blogModel.find().skip(skip).limit(4).sort({createdAt:-1});
            const totalCount = await blogModel.countDocuments();
            const hasMore = totalCount > skip + blogsFound.length;
            if(blogsFound.length==0){
                return res.json({success:false});
            }
            res.json({blogsFound,hasMore,success:true});
        }
        catch(err){
            res.json({result:false,message:err.message,success:false});
        }
    }
    else{
        try{
            const blogsFound = await blogModel.find({category}).skip(skip).limit(4);
            const totalCount = await blogModel.countDocuments({category});
            const hasMore = totalCount > skip + blogsFound.length;
            if(blogsFound.length==0){
                return res.json({success:false});
            }
            res.json({blogsFound,hasMore,success:true});
        }
        catch(err){
            res.json({result:false,message:err.message,success:false});
        }
    }
})

app.post('/getRecommendedBlogs',async(req,res)=>{
    try{
        const {category,id} = req.body;
        const result = await blogModel.find({ _id:{ $ne:id },category}).sort({createdAt:-1}).limit(8);
        res.json({result,success:true});
    }
    catch(err){
        res.json({success:false,message:err.message});
    }
})

app.get('/getBlogsByProfile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
        if (err) {
            return [];
        }
        const result = await blogModel.find({ username: info.username }).sort({createdAt:-1});
        res.json(result);
    })
})

app.post('/getBlogById', async (req, res) => {
    const { blogId } = req.body;
    try {
        const result = await blogModel.findOne({ _id: new ObjectId(blogId) });
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/addComment', async (req, res) => {
    const { comment, username, blogId, blogBy } = req.body;
    console.log(username);
    try {
        const newComment = await commentModel.create({ comment, username, blogId, blogBy });
        await newComment.save();
        res.json({ success: true, message: "Comment added." })
    }
    catch (err) {
        res.json({ success: false, message: "Server error." })
    }
})

app.post('/getCommentsByBlog', async (req, res) => {
    const { blogId } = req.body;
    const result = await commentModel.find({ blogId }).sort({ createdAt: -1 });
    console.log(result);
    res.json(result);
})

app.put('/likeBlog', async (req, res) => {
    const { blogId, likedBy, blogBy } = req.body;
    const result = await likeModel.findOne({ likedBy, blogId });
    if (result) {
        try {
            await likeModel.deleteOne({ blogId, likedBy });
            await blogModel.updateOne({ _id: new ObjectId(blogId) }, { $inc: { likes: -1 } });
            res.json({ success: true, message: "Post unliked." });
        }
        catch (err) {
            console.log(err.message);
            res.json({ success: false, message: "Server error." })
        }
    }
    else {
        try {
            const newLike = await likeModel.create({ blogId, likedBy, blogBy });
            await newLike.save();
            await blogModel.updateOne({ _id: blogId }, { $inc: { likes: 1 } });
            res.json({ success: true, message: "Post liked." })
        }
        catch (err) {
            console.log(err.message);
            res.json({ success: false, message: "Server error." })
        }
    }
})

app.post('/search', async (req, res) => {
    const { searchString,skip } = req.body;
    console.log(skip);
    try{
        const blogsFound = await blogModel.find({$text:{$search:searchString}}).skip(skip).limit(4);
        const totalCount = await blogModel.countDocuments({ $text: { $search: searchString } });
        const hasMore = totalCount > skip + blogsFound.length;
        if(blogsFound.length==0){
            return res.json({success:false});
        }
        res.json({blogsFound,hasMore,success:true});
    }
    catch(err){
        res.json({result:false,message:err.message,success:false});
    }
})

app.get('/logout',async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });
        res.json({success:true,message:"Logged out successfully"})
    }
    catch(err){
        res.json({success:false,message:err.message});
    }
})

//Dashboard API's:

app.post('/getNotifications', async (req, res) => {
    const { username,skip } = req.body;
    console.log(username);
    try {
        const comments = await commentModel.find({ blogBy: username }).sort({ createdAt: -1 }).skip(skip).limit(4);
        const likes = await likeModel.find({ blogBy: username }).sort({ createdAt: -1 }).skip(skip).limit(4);
        const combined = [...likes, ...comments];

        const commentCount = await commentModel.countDocuments({blogBy:username});
        const likeCount = await likeModel.countDocuments({blogBy:username});
        const hasMore = commentCount+likeCount>combined.length+skip*2;
        combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json({combined,hasMore,success:true});
    }
    catch (err) {
        console.log({success:false,message:err.message});
    }
})

app.delete('/deleteBlog', async (req, res) => {
    const { blogId } = req.body;
    try {
        await blogModel.deleteOne({ _id: blogId });
        await likeModel.deleteMany({ blogId });
        await commentModel.deleteMany({ blogId });
        res.json({ message: "Blog deleted.", success: true })
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "Server error.", success: false })
    }

})

app.post('/getGraphData', async (req, res) => {
    const { username } = req.body;
    try {
        const x_axis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10 days
        const y_axis_likes = [];
        const y_axis_comments = []

        for (let i = 9; i >= 0; i--) {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            startOfDay.setDate(startOfDay.getDate() - i);
            const endOfDay = new Date(startOfDay);
            endOfDay.setHours(23, 59, 59, 999);

            const countLikes = await likeModel.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, blogBy: username });
            const countComments = await commentModel.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }, blogBy: username });
            y_axis_likes.push(countLikes);
            y_axis_comments.push(countComments);
        }
        res.json({ x_axis, y_axis_likes, y_axis_comments });
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: err.message })
    }
})

app.post('/editBlog', async (req, res) => {
    const { blogId, title, summary, category } = req.body;
    const updateData = {};
    if (title) { updateData.title = title; }
    if (summary) { updateData.summary = summary; }
    if (category) { updateData.category = category }
    try {
        await blogModel.updateOne({ _id: blogId }, { $set: updateData });
        res.json({ success: true, message: "Blog edited successfully." })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
})

app.post('/getStats',async(req,res)=>{
    const {username} = req.body;
    try{
        const noOfLikes = await likeModel.countDocuments({blogBy:username});
        const noOfComments = await commentModel.countDocuments({blogBy:username});
        res.json({noOfLikes,noOfComments});
    }
    catch(err){
        console.log(err.message);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})