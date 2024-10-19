import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [loggedIn,setLoggedIn] = useState(false);

  const checkProfile = async()=>{
    const response = await fetch('http://127.0.0.1:3000/profile',{
      method:'GET',
      credentials:'include'
    })
    const result = await response.json();
    setLoggedIn(result);
  }

  useEffect(()=>{
    checkProfile();
  },[])


  return (
    <nav className='flex items-center justify-between border-b border-black px-4 py-3 '> 
  {/* sticky top-0 backdrop-blur */}
      <Link to='/'><h3 className='font-bold text-2xl'>Blogify</h3></Link>

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
  )
}

export default Navbar
