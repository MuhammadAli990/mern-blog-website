import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { FaArrowAltCircleUp, FaUserEdit } from 'react-icons/fa';
import { IoNotificationsSharp } from "react-icons/io5";

function Sidebar(props) {
    const {setOption,option} = props;
    
  return (
    <div className='h-full flex flex-col gap-2 border-slate-800 pt-4'>
        <button onClick={()=>setOption("Home")} className={`${option!=="Home"? "w-[90%]":""} border-2 border-l-0 border-black py-2 text-right px-2 sp-shd-option cursor-pointer`}>
            <h4 className='text-lg font-semibold lg:flex hidden justify-end'>Home</h4>
            <h4 className='text-lg font-semibold lg:hidden flex justify-end'><AiFillHome/></h4>
        </button>
        <button onClick={()=>setOption("Notifications")} className={`${option!=="Notifications"? "w-[90%]":""} border-2 border-l-0 border-black py-2 text-right px-2 sp-shd-option cursor-pointer`}>
            <h4 className='text-lg font-semibold lg:flex hidden justify-end'>Notifications</h4>
            <h4 className='text-lg font-semibold lg:hidden flex justify-end'><IoNotificationsSharp/></h4>
        </button>
        <button onClick={()=>setOption("Manage Blogs")} className={`${option!=="Manage Blogs"? "w-[90%]":""} border-2 border-l-0 border-black py-2 px-2 sp-shd-option cursor-pointer`}>
            <h4 className='text-lg font-semibold lg:flex hidden justify-end'>Manage Blogs</h4>
            <h4 className='text-lg font-semibold lg:hidden flex justify-end'><FaUserEdit/></h4>
        </button>
    </div>
  )
}

export default Sidebar
