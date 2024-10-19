import React, { useState,useEffect } from 'react'
import LikeNotification from './LikeNotification';
import CommentNotification from './CommentNotification';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../privateRoutes/Loader';

function Notifications() {
    const [notifications,setNotifications] = useState([]);
    const [skip,setSkip] = useState(0);
    const [hasMore,setHasMore] = useState(true);



    const getNotifications = async()=>{
        const res = await fetch('http://127.0.0.1:3000/profile',{
            credentials:'include'
        })
        const result = await res.json();
        const response = await fetch('http://127.0.0.1:3000/getNotifications',{
            method:"POST",
            body:JSON.stringify({username:result.username,skip}),
            headers:{'Content-Type': 'application/json'}
        })
        const result2 = await response.json();
        console.log(result2.hasMore);
        if(result2.success==true){
          setNotifications((p)=>[...p,...result2.combined]);
          setHasMore(result2.hasMore);
        }
    }
    useEffect(()=>{
        if(hasMore){
          getNotifications();
        }
    },[skip])

  return (
    <div className='flex flex-col gap-2 p-4 col-span-5 animate-text'>
      <InfiniteScroll
        dataLength={notifications?.length}
        next={() => {
            setSkip((p)=>p+4);
        }}
        loader={<Loader/>}
        hasMore={hasMore}
        className='flex flex-col gap-2'
        >
        {notifications.map((ele,ind)=>{
          return(
            ele.comment!=undefined?
            <CommentNotification key={ind} ele={ele}/>
            :
            <LikeNotification key={ind} ele={ele}/>
          );
        })}
      </InfiniteScroll>


    </div>
  )
}

export default Notifications
