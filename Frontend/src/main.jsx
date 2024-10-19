import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './components/authPages/Login.jsx';
import Register from './components/authPages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import Profile from './components/profile/Profile.jsx';
import CreateBlog from './components/createBlog/CreateBlog.jsx';
import Blog from './components/blog/Blog.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import PrivateRoute from './components/privateRoutes/PrivateRoute.jsx';
import PrivateRouteError from './components/privateRoutes/PrivateRouteError.jsx';
import PageNotFound from './components/errors/PageNotFound.jsx';
import SearchResult from './components/searchBlog/searchResult.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:'/profile',
    element:<PrivateRoute Component={Profile} />
  },
  {
    path:'/createBlog',
    element:<PrivateRoute Component={CreateBlog} />
  },
  {
    path:'/blog/:blogId',
    element:<Blog/>
  },
  {
    path:'/dashboard',
    element:<PrivateRoute Component={Dashboard}/>
  },
  {
    path:'/search/:searchString',
    element:<SearchResult/>
  },
  {
    path:'*',
    element:<PageNotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
  </>,
)
