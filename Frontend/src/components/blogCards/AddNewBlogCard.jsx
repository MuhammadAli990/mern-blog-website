import React from 'react'
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AddNewBlogCard() {
  return (
    <Link to='/createBlog' className='border border-black duration-200 bg-slate-200 flex justify-center items-center cursor-pointer'>
      <IoAddCircleSharp className='text-7xl p-2 text-slate-900'/>
    </Link>
  )
}

export default AddNewBlogCard
