import React, { useEffect, useState } from 'react'
import ManageBlogCard from '../blogCards/ManageBlogCard';

function ManageBlogs() {
    const [blogs,setBlogs] = useState([]);
    const [refresh,setRefresh] = useState(true);

    const getUserBlogs = async()=>{
      setRefresh(false);
        const response = await fetch('http://127.0.0.1:3000/getBlogsByProfile',{
            credentials:"include",
            method:"GET"
        })
        const result = await response.json();
        setBlogs(result);
    }

    useEffect(()=>{
        if(refresh===true){
          getUserBlogs();
        }
    },[refresh])
    
  return (
    <div className='col-span-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-3'>
      {blogs.map((ele,ind)=>{
        return(<ManageBlogCard ele={ele} setRefresh={setRefresh} key={ind}/>)
      })}
    </div>
  )
}

export default ManageBlogs
