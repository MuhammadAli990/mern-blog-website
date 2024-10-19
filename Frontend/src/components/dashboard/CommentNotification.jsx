import React, { useEffect, useState } from 'react'
import { formatDate } from '../../../resources/DateFormatter';


function CommentNotification(props) {
    const {ele} = props;
    const [blog,setBlog] = useState(null);

    const getBlogData = async()=>{
        const response = await fetch('http://127.0.0.1:3000/getBlogById',{
            method:'POST',
            body:JSON.stringify({blogId:ele.blogId}),
            headers:{'Content-Type': 'application/json'}
        })
        const result = await response.json();
        setBlog(result);
    }

    useEffect(()=>{
        getBlogData();
    },[])

  return (
    <div className="flex justify-between items-center gap-2 p-4 bg-white border border-gray-200 shadow-md">
        <div>
            <p className="font-semibold"><span className='font-bold'>{ele.username}</span> commented: {ele.comment}</p>
            <p className="text-sm text-gray-700">{blog?.title}</p>
            <p className="text-sm text-gray-500">{formatDate(ele.createdAt)}</p>
        </div>
        <div className='h-16 w-24 flex justify-center items-center overflow-hidden'>
            {blog==null? <div className='w-full h-full object-cover bg-slate-200 animate-pulse'></div>
            :<img src={"http://127.0.0.1:3000/uploads/"+blog?.thumbnail} class="w-full h-full object-cover"/>}
        </div>
    </div>
  )
}

export default CommentNotification
