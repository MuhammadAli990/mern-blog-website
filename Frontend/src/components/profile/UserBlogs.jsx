import React, { useEffect, useState } from "react";
import BlogCard from "../blogCards/BlogCard.jsx";
import AddNewBlogCard from "../blogCards/AddNewBlogCard.jsx";

function UserBlogs() {
  const [blogs,setBlogs] = useState([]);
  const getUserBlogs = async()=>{
    const response = await fetch("http://127.0.0.1:3000/getBlogsByProfile",{
      credentials:"include"
    })
    const result = await response.json();
    setBlogs(result);
  }
  useEffect(()=>{
    getUserBlogs();
  },[])
  return (
    <>
      <div>
        <h2 className="font-semibold text-3xl mt-3 mb-1">Your Uploaded Blogs</h2>  
      </div> 
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
        <AddNewBlogCard/>
        {blogs.map((ele,ind)=>{
          return(
            <BlogCard oid={ele._id} category={ele.category} title={ele.title} summary={ele.summary} thumbnail={ele.thumbnail} key={ind}/>
          );
        })}
      </div>
    </>
  );
}

export default UserBlogs;
