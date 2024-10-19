import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero(){
  const [searchString,setSearchString] = useState('');
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    navigate('/search/'+searchString);
  }

  return (
    <div className="flex flex-col gap-6 items-center">

      <div>
        <h1 className="font-bold sm:text-6xl text-5xl">Blogify</h1>  
      </div>  

      <div className="text-center">
        <TypeAnimation
          sequence={[
            "Discover Your Next Favorite Blog",
            1000,
            "Share Your Stories with the World",
            1000,
            "Explore New Voices and Ideas",
            1000,
            "Connect with a Community of Readers",
            1000,
          ]}
          speed={50}
          className="font-semibold sm:text-2xl text-xl"
          repeat={Infinity}
        />
      </div>

      <form onSubmit={handleSubmit} className="sp-shd-input">
        <input onChange={(e)=>setSearchString(e.target.value)} type="text" className="outline-none p-2 border border-black lg:w-[470px] sm:w-[420px] w-[270px]" placeholder="Search about your favourite topic.."/>
        <button type="submit" className="py-2 px-4 border border-black border-l-0">Search</button>
      </form>
    </div>
  );
}

export default Hero;
