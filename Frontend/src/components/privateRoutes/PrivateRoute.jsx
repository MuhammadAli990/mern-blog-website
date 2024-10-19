import React, { useEffect } from 'react'
import { useState } from 'react';
import PrivateRouteError from './PrivateRouteError';
import Loader from './Loader';

function PrivateRoute(props) {
    const {Component} = props;
    const [authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true);

    const checkAuthentication = async()=>{
        const res = await fetch('http://127.0.0.1:3000/profile',{
            credentials:"include"
        })
        const result = await res.json();
        setLoading(false);
        if(result){
            setAuthenticated(true);
        }
    }
    useEffect(()=>{
        checkAuthentication();
    },[])

    return authenticated? <Component/>:loading?<Loader/>:<PrivateRouteError/>
}

export default PrivateRoute
