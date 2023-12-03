import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function Dashboard({ isLoggedIn, setIsLoggedIn, user, setUser}) {

  if (isLoggedIn === null) {
    return <Navigate to={'/login'} />
  } else {
    return (
      <div className="h-full w-full flex justify-center items-start flex-col px-52 bg-hero-image bg-center bg-cover bg-no-repeat">
        <h1 className="text-6xl text-night mb-5 font-bold">IT ALL STARTS HERE<span className=" text-primaryColor">.</span></h1>
        <p className="text-2xl text-night px-42 mb-5">Browse our cutting-edge athletic apparel</p>
        <button className='text-white bg-gradient-to-r mb-6 from-cyan-500 to-blue-500 py-2 px-10 rounded-full drop-shadow-lg' type='submit'>SHOP NOW</button>
      </div>
    );
  };
};