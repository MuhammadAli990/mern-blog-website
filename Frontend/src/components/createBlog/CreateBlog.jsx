import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { successMessage } from "../toasts/SuccessToast";
import { errorMessage } from "../toasts/ErrorToast";

function CreateBlog() {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [category,setCategory] = useState('');
    const [thumbnail,setThumbnail] = useState(null);
    const navigate = useNavigate();

    const uploadBlog = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('category',category);
        formData.append('thumbnail', thumbnail);
        const response = await fetch("http://127.0.0.1:3000/uploadBlog",{
            method:"POST",
            body:formData,
            credentials:'include'
        })
        const result = await response.json();
        if(result.success){
            successMessage("Blog Uploaded.");
            navigate('/profile');
        }
        else{
            errorMessage(result.message);
        }
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

  return (
    <>
      <Navbar />
      <form className="max-w-[1200px] mx-auto py-6 px-4 flex flex-col gap-4" onSubmit={uploadBlog}>

        <h2 className="font-semibold text-3xl">Create a blog</h2>

        <input required type="text" maxLength={50} placeholder="Title of blog" className="outline-none border border-black p-2 sp-shd-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>

        <textarea required type="text" maxLength={80} placeholder="Summary..." className="outline-none border border-black p-2 sp-shd-input" value={summary} onChange={(e)=>setSummary(e.target.value)}/>

        <ReactQuill theme="snow" className="sp-shd-input" value={content} onChange={(val)=>setContent(val)} modules={modules} formats={formats} placeholder="Your content here"/>

        <select onChange={(e)=>setCategory(e.target.value)} className="border border-black sp-shd-btn p-2 outline-none" required>
            <option selected hidden disabled value="None">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
        </select>    

        <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold" htmlFor="img_input">Choose thumbnail</label>
            <input accept="image/*" onChange={(e)=>setThumbnail(e.target.files[0])} required type="file" id="img_input" className="border border-black sp-shd-btn p-2"/>
        </div>

        <div className="flex justify-end">
            <button className="px-4 py-2 sp-shd-btn font-semibold border border-black">Upload</button>
        </div>

      </form>
    </> 
  );
}

export default CreateBlog;
