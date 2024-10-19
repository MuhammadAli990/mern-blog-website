import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="mx-auto min-h-screen flex justify-center items-center">
        <div className="text-center">
            <h1 className="text-9xl font-extrabold">404</h1>
            <p className="text-4xl font-extrabold">Something's missing.</p>
            <p className="text-xl mt-2">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
            <Link to="/"><button className='rounded-md px-8 py-1 border mt-10 border-black text-xl hover:bg-black hover:text-white duration-200'>Go to home</button></Link>
        </div>   
    </div>
  )
}

export default PageNotFound
