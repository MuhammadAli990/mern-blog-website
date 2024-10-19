import React, { useState } from 'react'
import { FcLike } from "react-icons/fc";
import { successMessage } from '../toasts/SuccessToast';
import { errorMessage } from '../toasts/ErrorToast';

function EngagementControls(props) {
    const {blogData,refresh,setRefresh} = props;

    const handleLikeButton = async ()=>{
      const response = await fetch("http://127.0.0.1:3000/profile",{
        credentials:"include"
      })
      const info = await response.json();
      if(info==false){
        errorMessage("Log in to like blogs.");
        return;
      }
      const res = await fetch("http://127.0.0.1:3000/likeBlog",{
        method:"PUT",
        body:JSON.stringify({blogId:blogData._id.toString(),likedBy:info.username,blogBy:blogData.username}),
        headers:{ "Content-Type": "application/json"}
      })
      const result = await res.json();
      if(result.success){
        successMessage(result.message);
      }
      else{
        errorMessage(result.message);
      }
      setRefresh(!refresh);
    }

  return (
    <div className='w-full flex justify-between gap-4 border p-4 border-black sp-shd-input'>
      <div className='flex items-center gap-2'>
        <div><img src="/profile.jpg" className='h-12 w-12 rounded-full' /></div>
        <div>
            <h3 className='font-bold text-lg'>@{blogData?.username}</h3>
            <p></p>
        </div>
      </div>

      <div className='flex items-center justify-between'>
          <button onClick={handleLikeButton} className='flex gap-1'><FcLike className='text-2xl'/>{blogData?.likes}</button>
      </div>
    </div>
  )
}

export default EngagementControls
