import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js'

ChartJs.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

function WelcomeScreen(props) {
  const {graphData,profileData} = props;
  const [stats,setStats] = useState({})

  const getData = async()=>{
    const response = await fetch('http://127.0.0.1:3000/profile',{
      credentials:'include'
    })
    const result = await response.json();
    const res = await fetch('http://127.0.0.1:3000/getStats',{
      method:"POST",
      body:JSON.stringify({username:result.username}),
      headers:{'Content-Type':'application/json'}
    })
    const result1 = await res.json();
    setStats(result1);
  }
  useEffect(()=>{
    getData();
  },[])

  const likesData = {
    labels:graphData?.x_axis,
    datasets:[{
      data:graphData?.y_axis_likes,
      borderColor:"#000000",
      tension:0.5
    }]
  };
  const commentsData = {
    labels:graphData?.x_axis,
    datasets:[{
      data:graphData?.y_axis_comments,
      borderColor:"#000000",
      tension:0.5
    }]
  }
  const options = {};

  return (
    <div className='col-span-5 flex flex-col md:px-10 px-4 py-4 gap-4'>
        <h4 className='font-bold md:text-2xl text-xl animate-text pl-1'>Welcome back, {profileData?.username}</h4>

        <div className='flex justify-start gap-2 pl-1'>
          <div className='shadow-md border px-4 py-2 animate-text'>
            <div><h4 className='font-semibold'>No of Likes</h4></div>
            <div>{stats?.noOfLikes}</div>
          </div>
          <div className='border shadow-md px-4 py-2 animate-text'>
            <div><h4 className='font-semibold'>No of comments</h4></div>
            <div><p>{stats?.noOfComments}</p></div>
          </div>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
        <div>
          <Line data={likesData} options={options}/>
          <h3 className='text-center font-semibold text-sm'>Likes in last 10 days</h3>
        </div>

        <div>
          <Line data={commentsData} options={options}/>
          <h3 className='text-center font-semibold text-sm'>Comments in last 10 days</h3>
        </div>
        </div>
        
    </div>
  )
}

export default WelcomeScreen
