import React from 'react'
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ConfirmationCard from '../dashboard/ConfirmationCard';
import { useState } from 'react';
import EditBlogCard from '../dashboard/EditBlogCard';

function ManageBlogCard(props) {
  const {ele,setRefresh} = props;
  const blogId = ele._id.toString();
  const [showConfirmCard,setShowConfirmCard] = useState(false);
  const [showEditCard,setShowEditCard] = useState(false);

  const handleDeleteButton = async()=>{
    setShowConfirmCard(true);
  }

  return (
    <>
    <div className='relative bg-white border border-black sp-shd-card duration-500 group'>
    <Link to={"/blog/"+blogId}>

      <div className='sm:h-40 h-24 flex justify-center items-center overflow-hidden'>
        <img src={"http://localhost:3000/uploads/"+ele.thumbnail} className='h-full w-full object-cover group-hover:scale-105 duration-500'/>
      </div>

      <div className='flex flex-col gap-2 p-4 mb-8'>

        <div><span className='bg-black text-white p-1'>{ele.category}</span></div>

        <div><h3 className='text-lg font-semibold leading-tight'>{ele.title}</h3></div>

      </div>

    </Link>

    <div className='flex items-center justify-end gap-1 p-2 absolute bottom-0 right-0'>
        <button className='bg-slate-600 px-4 py-1  text-white rounded hover:bg-slate-700' onClick={()=>setShowEditCard(true)}>Edit</button>
        <button className='flex items-center bg-red-500 px-4 py-1 text-white rounded hover:bg-red-600 duration-200' onClick={()=>handleDeleteButton()}>Delete <MdDelete/></button>
    </div>

    </div>

    <ConfirmationCard setRefresh={setRefresh} showConfirmCard={showConfirmCard} setShowConfirmCard={setShowConfirmCard} blogId={ele._id}/>
    <EditBlogCard showEditCard={showEditCard} setShowEditCard={setShowEditCard} setRefresh={setRefresh} blogId={ele._id}/>
    </>
  )
}

export default ManageBlogCard
