import React from 'react'
import { Link } from 'react-router-dom';

function BlogCard(props) {
  const {title,summary,thumbnail,category,oid} = props;
  const blogId = oid?.toString();


  return (
    <Link to={"/blog/"+blogId} className='bg-white border border-black sp-shd-card duration-500 group'>

      <div className='sm:h-44 h-48 flex justify-center items-center overflow-hidden'>
        <img src={"http://localhost:3000/uploads/"+thumbnail} className='h-full w-full object-cover group-hover:scale-105 duration-500'/>
      </div>

      <div className='flex flex-col gap-2 p-4 overflow-hidden'>

        <div><span className='bg-black text-white p-1'>{category}</span></div>

        <div><h3 className='text-lg font-semibold'>{title}</h3></div>

        <div><p className='font-light text-sm'>{summary}</p></div>

        <div className='flex items-center gap-1 font-semibold cursor-pointer'>Read more... </div>

      </div>

    </Link>
  )
}

export default BlogCard
