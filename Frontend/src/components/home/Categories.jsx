import React, { useEffect, useState } from 'react'
import data from '../../../resources/data.json'
import BlogCard from '../blogCards/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../privateRoutes/Loader';


function Categories() {
    const [selectedCategory,setSelectedCategory] = useState("Latest");
    const [blogs,setBlogs] = useState([]);
    const [skip,setSkip] = useState(0);
    const [hasMore,setHasMore] = useState(true);

    const getBlogs = async(ele)=>{
        const response = await fetch("http://127.0.0.1:3000/getBlogsByCategory",{
            method:"POST",
            body:JSON.stringify({category:ele,skip}),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        console.log(result);
        if(result.success==true){
            setBlogs((p)=>[...p,...result.blogsFound]);
            setHasMore(result.hasMore);
        }
    }
    useEffect(()=>{
        if(hasMore){
            getBlogs(selectedCategory);
        }
    },[skip])
    const handleCategoryChange = (ele)=>{
        setSelectedCategory(ele);
        setSkip(0);
        setHasMore(true);
        setBlogs([]);
        getBlogs(ele);
    }

  return (
    
    <div className='flex flex-col gap-6'>
        <div className='px-4 sm:flex grid grid-cols-3 sm:gap-4 justify-center font-semibold text-center'>
            {data.categories.map((ele,ind)=>{
                return(
                    <h4 key={ind} onClick={()=>handleCategoryChange(ele)} className={`${'px-2 py-1 cursor-pointer'} ${ele==selectedCategory?'bg-black text-white':''}`}>{ele}</h4>
                );
            })}
        </div>

        <div>
            {blogs.length!=0?
                <InfiniteScroll
                dataLength={blogs?.length}
                next={() => {
                    setSkip((p)=>p+4);
                }}
                loader={<Loader/>}
                hasMore={hasMore}
                className='px-4 py-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'
            >
                {blogs.map((ele,ind)=>{
                    return(
                        <BlogCard oid={ele._id} category={ele.category} title={ele.title} summary={ele.summary} thumbnail={ele.thumbnail} key={ind}/>
                    );
                })}
                </InfiniteScroll>
            :
            <div className='px-4 py-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 justify-center font-semibold text-center'>
                {[1,2,3,4].map((_,ind)=>{
                return (<div key={ind} className='w-full h-[370px] bg-slate-200 animate-pulse'></div>);
                })}
            </div>
            }
        </div>
    </div>
  )
}

export default Categories
