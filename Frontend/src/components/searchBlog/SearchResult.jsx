import React from 'react'
import Navbar from '../navbar/navbar'
import Hero from '../home/Hero'
import { useParams } from 'react-router-dom'
import BlogsFound from './BlogsFound';

function SearchResult() {
    const {searchString} = useParams();

  return (
    <div className='flex flex-col gap-6'>
        <Navbar/>
        <Hero/>
        <div className=''>
            <h4 className='font-semibold text-xl mt-3 text-center'>Search results for "{searchString}":</h4>
            <BlogsFound searchString={searchString}/>
        </div>
    </div>
  )
}

export default SearchResult
