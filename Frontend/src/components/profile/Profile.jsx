import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import ProfileBar from "./ProfileBar";
import Separator from "./Separator";
import UserBlogs from "./UserBlogs";

function Profile() {
  const [profile, setProfile] = useState(false);

  const getProfileData = async () => {
    const response = await fetch("http://127.0.0.1:3000/profile", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    setProfile(result);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return(
    <>
        <Navbar/>
        <div className="max-w-[1200px] mx-auto py-6 px-4 flex flex-col gap-3">
            <ProfileBar profile={profile}/>
            <Separator/>
            <UserBlogs/>
        </div>
    </>
  );
}

export default Profile;
