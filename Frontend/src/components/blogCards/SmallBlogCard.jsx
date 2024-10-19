import React from 'react'
import { Link } from 'react-router-dom';

function SmallBlogCard(props) {
    const {blog} = props;
  return (
    <Link to={"/blog/"+blog._id.toString()} className='flex gap-2 p-1 shadow-md border w-full'>
      <div className='h-28 w-2/5 flex justify-center items-center overflow-hidden'>
        <img src={"http://localhost:3000/uploads/"+blog.thumbnail} className='h-full w-full object-cover'/>
      </div>
      <div className='flex flex-col w-3/5 relative'>
        <h5 className='font-semibold capitalize leading-snug'>{blog.title}</h5>
        <p className='text-sm font-light leading-tight'>{blog.summary.length>66? blog.summary.substring(0,63)+"...":blog.summary}</p>
        <div className='absolute right-0 bottom-0 m-1'>
            <span className='bg-black text-white text-sm px-2 py-1'>{blog.category}</span>
        </div>
      </div>
    </Link>
  )
}

export default SmallBlogCard
