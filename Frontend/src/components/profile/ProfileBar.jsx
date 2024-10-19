import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { successMessage } from "../toasts/SuccessToast";
import { errorMessage } from "../toasts/ErrorToast";
import { useNavigate } from "react-router-dom";

function ProfileBar(props) {
  const { profile } = props;
  const navigate = useNavigate();
  
  const handleLogoutButton = async()=>{
    const res = await fetch('http://127.0.0.1:3000/logout',{
      method:"GET",
      credentials:"include"
    })
    const result = await res.json();
    if(result.success){
      successMessage(result.message);
      navigate('/');
    }
    else{
      errorMessage(result.message);
    }
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/profile.jpg" className="h-10 w-10 rounded-full border border-black" />
        <h4 className="font-semibold">@{profile.username}</h4>
      </div>
      <div className="flex gap-4">
        <Link to={'/dashboard'}>
          <button className="border border-black px-4 py-1 font-semibold sp-shd-btn">Dashboard</button>
        </Link>
        <button onClick={handleLogoutButton} className="border border-black px-4 py-1 font-semibold sp-shd-btn">Log out</button>
      </div>
    </div>
  );
}

export default ProfileBar;
