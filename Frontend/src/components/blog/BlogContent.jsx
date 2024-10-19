import React, { useState } from "react";
import DOMPurify from "dompurify";
import { useEffect } from "react";

function BlogContent(props) {
  const { blogData } = props;
  const sanitizedContent = DOMPurify.sanitize(blogData.content);
  const [content,setContent] = useState('');
  useEffect(() => {
    let modifiedContent = sanitizedContent.replace(/<h1>/g, "<h1 class='text-2xl mt-2'>")
    .replace(/<h2>/g, "<h2 class='text-xl mt-1'>");
    setContent(modifiedContent);
  }, [sanitizedContent]);
  

  return (
    <>
      <h1 className="font-bold sm:text-4xl text-3xl uppercase">
        {blogData.title}
      </h1>
      <div>
        <span className="bg-black text-white px-4 py-2 font-semibold">
          {blogData.category}
        </span>
      </div>
      <div className="rounded-md sm:h-[460px] h-[210px] flex justify-center items-center overflow-hidden border-black">
        <img
          className="h-full w-full object-cover border"
          src={"http://localhost:3000/uploads/" + blogData.thumbnail}
        />
      </div>
      <div className="px-2" dangerouslySetInnerHTML={{__html:content}} />
    </>
  );
}

export default BlogContent;
