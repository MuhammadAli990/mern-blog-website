import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Comment from './Comment.jsx';
import { successMessage } from '../toasts/SuccessToast.js';
import { errorMessage } from '../toasts/ErrorToast.js';

function CommentSection(props) {
    const {blogBy} = props;
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);

    const {blogId} = useParams();

    

    const handleComentUpload = async(e)=>{
        e.preventDefault();
        setComment('');
        const response = await fetch("http://127.0.0.1:3000/profile",{
            credentials:"include"
        })
        const result = await response.json();
        if(result==false){
            errorMessage("Login to add comments.");
            return;
        }

        const res = await fetch("http://127.0.0.1:3000/addComment",{
            method:"POST",
            body:JSON.stringify({username:result.username,comment,blogId,blogBy}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result2 = await res.json();
        if(result2.success){
            successMessage(result2.message);
            loadComments();
        }
        else{
            errorMessage(result2.message);
        }
    }

    const loadComments = async()=>{
        const response = await fetch("http://127.0.0.1:3000/getCommentsByBlog",{
            method:'POST',
            body:JSON.stringify({blogId}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        setComments(result);
    }

    useEffect(()=>{
        loadComments();
    },[])


  return (
    <div className='flex flex-col gap-3 px-1 mt-2'>
      <h4 className='font-semibold text-xl'>Write a comment</h4>  
      
      <form onSubmit={handleComentUpload} className='flex flex-col gap-2'>
        <input required value={comment} placeholder='Leave your thoughts...' type="text" className='w-full p-2 outline-none sp-shd-input border border-black' onChange={(e)=>setComment(e.target.value)}/>
        <div className='flex justify-end mt-2'>
            <button type='submit' className='sp-shd-btn border border-black px-6 font-semibold py-2'>Post</button>
        </div>
      </form>

      <h4 className='font-semibold text-xl'>Comments</h4>  
      {comments.length!=0 && <div className='border border-black flex flex-col gap-2 sp-shd-input p-2'>
        {comments.map((ele,ind)=>{
            return(
                <Comment key={ind} ele={ele}/>
            );
        })}
      </div>}
    </div>
  )
}

export default CommentSection
