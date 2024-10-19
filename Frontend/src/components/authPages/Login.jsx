import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { successMessage } from "../toasts/SuccessToast";
import { errorMessage } from "../toasts/ErrorToast";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:3000/login',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        });
        const result = await response.json();
        if(result.success){
            successMessage("Logged in successfully.");
            navigate('/');
        }
        else{
            errorMessage(result.message);
        }
    }

  return (
    <>
      <Navbar />

        <form className="flex flex-col gap-4 px-4 py-6 max-w-[400px] mx-auto" onSubmit={handleSubmit}>
            <h3 className="text-center font-bold text-4xl">Login</h3>
            <input required type="email" placeholder="Enter your email" className="outline-none border border-black sp-shd-input p-2" value={email} onChange={(e)=>setEmail(e.target.value.trim())}/>
            <input required type="password" placeholder="Enter your password" className="outline-none border border-black sp-shd-input p-2" value={password} onChange={(e)=>setPassword(e.target.value.trim())}/>
            <div className="flex justify-center items-center">
                <button type="submit" className="p-2 font-semibold border border-black sp-shd-btn w-20">Log-in</button>
            </div>
        </form>
    </>
  );
}

export default Login;
