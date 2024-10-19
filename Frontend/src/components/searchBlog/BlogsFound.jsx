import React, { useEffect } from 'react'
import { useState } from 'react';
import BlogCard from '../blogCards/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../privateRoutes/Loader';

function BlogsFound(props) {
    const {searchString} = props;
    const [searchResult,setSearchResult] = useState([]);
    const [skip,setSkip] = useState(0);
    const [hasMore,setHasMore] = useState(true);

    const fetchBlogs = async()=>{
        const response = await fetch('http://127.0.0.1:3000/search',{
            method:"POST",
            body:JSON.stringify({searchString,skip}),
            headers:{'Content-Type':'application/json'}
        })
        const result = await response.json();
        console.log(result);
        if(result.success==true){
            setSearchResult((p)=>[...p, ...result.blogsFound]);
            setHasMore(result.hasMore);
        }
    }
    useEffect(()=>{
        if(hasMore){
            fetchBlogs();
        }
    },[skip])

  return (
    <div className='max-w-[1200px] mx-auto'>
      {searchResult.length==0?
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
            {[1,2,3,4].map((ele,ind)=>{
            return(<div key={ind} className='w-full h-[300px] bg-slate-200 animate-pulse'></div>);
            })}
        </div>
        :
        <InfiniteScroll
            dataLength={searchResult?.length}
            next={() => {
                setSkip((p)=>p+4);
            }}
            loader={<Loader/>}
            hasMore={hasMore}
            className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4 py-4'
        >
            {searchResult.map((ele,ind)=>{
                return(
                    <BlogCard oid={ele._id} category={ele.category} title={ele.title} summary={ele.summary} thumbnail={ele.thumbnail} key={ind}/>
                );
            })}
        </InfiniteScroll>
      }
    </div>
  )
}

export default BlogsFound
