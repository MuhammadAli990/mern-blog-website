import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../navbar/DashboardNavbar'
import Sidebar from './Sidebar'
import WelcomeScreen from './WelcomeScreen';
import Notifications from './Notifications';
import ManageBlogs from './ManageBlogs';

function Dashboard() {
    const [option,setOption] = useState("Home");
    const [profileData,setProfileData] = useState({});
    const [graphData,setGraphData] = useState({});

    const getData = async()=>{
      const res = await fetch('http://127.0.0.1:3000/profile',{
        method:"GET",
        credentials:"include"
      })
      const result = await res.json();
      setProfileData(result);

      const response = await fetch("http://127.0.0.1:3000/getGraphData",{
        method:"POST",
        body:JSON.stringify({username:result.username}),
        headers:{'Content-type':"application/json"}
      })
      const gresult = await response.json();
      setGraphData(gresult);
    }

    useEffect(()=>{
      getData();
    },[])

  return (
    <>
      <DashboardNavbar/>
      <div className='grid grid-cols-6'>
        <Sidebar setOption={setOption} option={option}/>
        {option=="Home" && <WelcomeScreen graphData = {graphData} profileData={profileData}/>}
        {option=="Notifications" && <Notifications/>}
        {option=="Manage Blogs" && <ManageBlogs/>}
      </div>
    </>
  )
}

export default Dashboard
