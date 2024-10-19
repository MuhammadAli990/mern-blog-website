import React from 'react'
import { Link } from 'react-router-dom'

function PrivateRouteError() {
  return (
    <div className="mx-auto min-h-screen flex justify-center items-center">
        <div className="text-center">
            <h1 className="text-9xl font-extrabold">403</h1>
            <p className="text-4xl font-extrabold">This is a Private Route..</p>
            <p className="text-xl">To visit this route, please login with your account or sign up.</p>
            <Link to="/"><button className='rounded-md px-8 py-1 border mt-10 border-black text-xl hover:bg-black hover:text-white duration-200'>Go to home</button></Link>
        </div>   
    </div>
  )
}

export default PrivateRouteError
