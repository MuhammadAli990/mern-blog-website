import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar"
import { useParams } from "react-router-dom";
import BlogContent from "./BlogContent";
import CommentSection from "./CommentSection";
import RecommendedBlogs from "./RecommendedBlogs";
import EngagementControls from "./EngagementControls";

function Blog() {
  const {blogId} = useParams();
  const [blogData,setBlogData] = useState({});
  const [refresh,setRefresh] = useState(false);

  const getBlog = async()=>{
    const response = await fetch("http://127.0.0.1:3000/getBlogById",{
      method:"POST",
      body:JSON.stringify({blogId}),
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json();
    setBlogData(result);
  }

  useEffect(()=>{
    getBlog();
  },[blogId,refresh]) 

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  },[])


  return (
    <>
      <Navbar/>

      <div className="grid md:grid-cols-3 grid-cols-1 max-w-[1200px] px-4 py-4 mx-auto gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <BlogContent blogData={blogData}/>
          <div className="flex md:hidden"><EngagementControls blogData={blogData} setRefresh={setRefresh} refresh={refresh}/></div>
          <CommentSection blogBy={blogData?.username}/>
        </div>
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="md:flex hidden"><EngagementControls blogData={blogData} setRefresh={setRefresh} refresh={refresh}/></div>
          <RecommendedBlogs ide={blogData?._id} category={blogData.category}/>
        </div>
      </div>
    </>
  )
}

export default Blog
