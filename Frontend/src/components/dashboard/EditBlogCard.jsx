import React from 'react'
import data from '../../../resources/data.json'
import { useState } from 'react';
import { successMessage } from '../toasts/SuccessToast';
import { errorMessage } from '../toasts/ErrorToast';

function EditBlogCard(props) {
    const {showEditCard,setShowEditCard,blogId,setRefresh} = props;
    const [editData,setEditData] = useState({title:'',summary:'',category:''});

    const handleSubmit = async(e)=>{
        setShowEditCard(false);
        e.preventDefault();
        if(editData.title.trim()==='' && editData.summary.trim()==='' && editData.category.trim()===''){
            errorMessage("Change something to edit.")
        }
        else{
            const response = await fetch('http://127.0.0.1:3000/editBlog',{
                method:"POST",
                credentials:'include',
                body:JSON.stringify({title:editData.title,summary:editData.summary,category:editData.category,blogId}),
                headers:{'Content-Type':'application/json'}
            })
            const result = await response.json();
            if(result.success){
                setRefresh(true);
                successMessage("Blog edited.");
            }
            else{
                errorMessage(result.message);
            }
        }
    }

  return (
    <div className={`${showEditCard? "flex":"hidden"} fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50`}>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 w-96 rounded-md flex flex-col gap-2">
            <h3 className="font-bold text-xl">Edit Blog</h3>

            <label>Edit title:</label>
            <input placeholder='Leave empty if no change' onChange={(e) => {setEditData((p) => ({...p,title:e.target.value}))}} className='bg-slate-200 p-2 outline-none text-sm' type="text"/>

            <label>Edit summary:</label>
            <input placeholder='Leave empty if no change' onChange={(e)=>{setEditData((p)=>({...p,summary:e.target.value}))}} className='bg-slate-200 p-2 outline-none text-sm' type="text"/>

            <label>Change Category</label>
            <select onChange={(e)=>{setEditData((p)=>({...p,category:e.target.value}))}} className='bg-slate-200 p-2 outline-none text-sm'>
                <option value="">Select an option</option>
                {data.categories.map((ele,ind)=>{
                    if(ele!="Latest"){
                        return(<option key={ind} value={ele}>{ele}</option>);
                    }
                    else{
                        return null;
                    }
                })}
            </select>

            <div className="flex justify-end mt-2">
                <button type='button' onClick={()=>setShowEditCard(false)} className="bg-slate-200 hover:bg-slate-300 duration-200 text-gray-700 px-4 py-1 rounded mr-2">Cancel</button>
                <button type='submit' className="bg-blue-600 hover:bg-blue-700 duration-200 text-white px-4 py-1 rounded">Edit</button>
            </div>
        </form>

    </div>
  )
}

export default EditBlogCard
