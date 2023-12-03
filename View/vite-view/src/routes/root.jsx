import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import '../index.css';

const LOGOUT_URL = "/api/users/logout";

export default function Root({ isLoggedIn, setIsLoggedIn, setUser, user }) {

  const { auth, setAuth } = useAuth();

  const rootElement = document.getElementById('root');
  
  const navigate = useNavigate();

  const userData = JSON.parse(user);

  const handleLogout = async () => {

    try {
      const response = await axios.get(LOGOUT_URL,
        {
            headers: { 
                "Content-Type": "application/json" 
            },
            withCredentials: true
        }
    );

      if (response) {
        window.localStorage.clear();
        setIsLoggedIn(null);
        setUser(null);
        navigate('/login');
      }
      
    } catch (error) {
      if (error?.response?.data === "please sign back in") {
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userData');
        setIsLoggedIn(null);
        setUser(null);
        navigate('/login');
      }
    }
  }

  const kidsClick = async () => {

    try {
      const response = await axios.get('/api/products/', 
        {
            headers: { 
                "Content-Type": "application/json" 
            },
            withCredentials: true
        }
    );

    if (response) {
      console.log(response.data)
    };

    } catch (error) {
      if (error?.response?.data === 'please sign back in') {

        const response = await axios.get('/api/users/logout', 
          {
              headers: { 
                  "Content-Type": "application/json" 
              },
              withCredentials: true
          }
        );

        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userData');
        setIsLoggedIn(null);
        setUser(null);
        navigate('/login');
      }
    }
  };
  
    if (isLoggedIn === true) {
      return (
      <>
        <header className="fixed z-10 top-0 w-full h-20 bg-white border-b-2 flex justify-center">
          <div className="flex justify-between w-full items-center px-10">
            <div className="flex justify-left items-center text-night bg-gradient-to-r h-full py-2  w-1/3"><p>Welcome{userData.newUser ?`, ${userData.userName}`: ` back, ${userData.userName}`}!</p></div>
            <ul className="flex justify-center w-full items-center gap-10 ">
              <Link onClick={kidsClick}>Kids</Link>
              <Link>Men</Link>
              <Link>Women</Link>
              <Link>Sale</Link>
            </ul>
            <div className="flex justify-end items-center gap-10 w-1/3" >
              <Link className="py-2"><i className="fa-solid fa-cart-shopping"></i></Link>
              <button onClick={handleLogout} className="py-2">Logout</button>
            </div>
          </div>
        </header>
        <Outlet />
      </>
      )
    } else {
      return (
        <>
        <header className="fixed z-10 top-0 w-full h-20 bg-white border-b-2 flex justify-center">
          <div className="flex justify-between w-full items-center px-10">
            <div className="flex justify-left items-center text-night bg-gradient-to-r h-full py-2  w-1/3"><p>Hi there!</p></div>
            <ul className="flex justify-center w-full items-center gap-10 ">
              <Link>Kids</Link>
              <Link>Men</Link>
              <Link>Women</Link>
              <Link>Sale</Link>
            </ul>
            <div className="flex justify-end items-center gap-10 w-1/3" >
              <button onClick={handleLogout} className="py-2"></button>
            </div>
          </div>
        </header>
          <Outlet />
        </>
      )
    }
  }