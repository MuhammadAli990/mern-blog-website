import React from "react";

function Comment(props) {
  const { ele } = props;
  return (
    <div className="flex border shadow-md rounded-md p-2 gap-2">
      <img src="/profile.jpg" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <h4 className="font-semibold">{ele.username}</h4>
        <p className="break-all">{ele.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
