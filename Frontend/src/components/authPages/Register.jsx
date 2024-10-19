import React, { useState } from 'react'
import Navbar from '../navbar/navbar'
import { errorMessage } from '../toasts/ErrorToast';
import { successMessage } from '../toasts/SuccessToast';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const register = async(e)=>{
        e.preventDefault();
        email.trim();
        const response = await fetch('http://127.0.0.1:3000/register',{
            method:'POST',
            body:JSON.stringify({username,email,password}),
            headers:{'Content-Type':'application/json'}
        });
        const result = await response.json();
        console.log(result);
        if(result.success){
            successMessage("Account Registered.");
            navigate('/login');
            setUsername('');
            setEmail('');
            setPassword('');
        }
        else{
            errorMessage(result.message);
        }
    }

  return (
    <>
      <Navbar />

      <form onSubmit={register} className="flex justify-center flex-col gap-4 px-4 py-6 max-w-[400px] mx-auto">
        <h3 className="text-center font-bold text-4xl">Register</h3>
        <input minLength={3} required type="text" placeholder="Choose username" className="outline-none border border-black sp-shd-input p-2" value={username} onChange={(e)=>setUsername(e.target.value.trim())}/>
        <input required type="email" placeholder="Enter your email" className="outline-none border border-black sp-shd-input p-2" value={email} onChange={(e)=>setEmail(e.target.value.trim())}/>
        <input minLength={6} required type="password" placeholder="Enter your password" className="outline-none border border-black sp-shd-input p-2" value={password} onChange={(e)=>setPassword(e.target.value.trim())}/>
        <div className="flex justify-center items-center">
            <button type='submit' className="p-2 font-semibold border border-black sp-shd-btn w-20">Submit</button>
        </div>
      </form>

    </>
  )
}

export default Register
