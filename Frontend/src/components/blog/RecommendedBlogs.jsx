import React, { useEffect, useState } from 'react'
import SmallBlogCard from '../blogCards/SmallBlogCard';

function RecommendedBlogs(props) {
    const {category,ide} = props;
    const [blogs,setBlogs] = useState([]);

    const getRecommendedBlogs = async()=>{
        const response = await fetch("http://127.0.0.1:3000/getRecommendedBlogs",{
            method:"POST",
            body:JSON.stringify({category,id:ide}),
            headers: { 'Content-Type': 'application/json' }
        })
        const result = await response.json();
        if(result.success){
          setBlogs(result.result);
        }
    }

    useEffect(()=>{
        getRecommendedBlogs();
    },[props])
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h4 className='text-xl font-bold px-1'>Recommended:</h4>
      {blogs.length!=0?blogs.map((ele,ind)=>{
        return(
            <SmallBlogCard blog={ele} key={ind} />
        );
      })
      :
      [1,2,3,4].map((ele,ind)=>{
        return(
          <div className='w-full h-28 bg-slate-200 animate-pulse'></div>
        );
      })
      }
    </div>
  )
}

export default RecommendedBlogs
