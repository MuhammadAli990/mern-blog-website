import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function DashboardNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkProfile = async () => {
    const response = await fetch("http://127.0.0.1:3000/profile", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    setLoggedIn(result);
  };

  useEffect(() => {
    checkProfile();
  }, []);
  return (
    <nav className='flex items-center justify-between border-b-2 border-black sm:px-4 px-2 py-3'>

      <Link to='/'>
        <div className="flex items-center">
            <h3 className='font-bold sm:text-2xl text-lg'>Blogify |&nbsp;</h3>
            <p className="mt-1 font-semibold sm:text-xl sm:pb-0 pb-0.5">Dashboard</p>
        </div>
      </Link>

      {loggedIn?
        <div className='flex items-center gap-4'>
          <Link to='/profile'>
            <img src="/profile.jpg" className='w-10 h-10 rounded-full border border-black cursor-pointer'/>
          </Link>
          <Link to='/createBlog'>
            <button className='border border-black px-4 py-1 font-semibold sp-shd-btn'>Create Blog</button>
          </Link>
        </div>
        :
        <div className='flex gap-4'>
        
          <Link to='/login'><button className='border border-black px-4 py-1 font-semibold sp-shd-btn'>Login</button></Link>
          <Link to='/register'><button className='border border-black px-4 py-1 font-semibold sp-shd-btn'>Register</button></Link>

        </div>}

    </nav>
  );
}

export default DashboardNavbar;
