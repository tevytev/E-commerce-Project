import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { LoginForm } from "../features/LoginForm";
import useAuth from "../hooks/useAuth";
import { GoogleLogin } from 'react-google-login';

import axios from "../api/axios";
const LOGIN_URL = "/api/users/login"
const clientId = "115137430214-ek4lrtkvoa3sh8roiln0mp0fiermhtpe.apps.googleusercontent.com"

export default function Login({ setUser, isLoggedIn, setIsLoggedIn }) {

    const { setAuth } = useAuth();

    const [username, setUsername] = useState('Tevin');
    const [pwd, setPwd] = useState('Bridget1003!');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userData');
        setIsLoggedIn(null);
        setUser(null);
        }
    }, [isLoggedIn]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            userName: username,
            password: pwd
        };

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify(formData),
                {
                    headers: { 
                        // "credentials": "include",
                        "Content-Type": "application/json" 
                    },
                    withCredentials: true
                }
            );

            if (response) {
                window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
                setIsLoggedIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
                window.localStorage.setItem('userData', JSON.stringify(response.data));
                setUser(window.localStorage.getItem('userData'));
                const user = response.data;
                // console.log(user);
                // setAuth({user: user})
                navigate('/home');
            }
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if (error.response?.status === 401) {
                setErrMsg('Incorrect username or password');
            } else {
                setErrMsg('Login failed');
            };

            errRef.current.focus();
        }
    }

    if (isLoggedIn === true) {
        return (
            <>
            <Navigate to={'/home'} />;
            </>
        )
    }

    return (
        <>
        <LoginForm
        username={username}
        setUsername={setUsername}
        pwd={pwd}
        setPwd={setPwd}
        errMsg={errMsg}
        setErrMsg={setErrMsg}
        errRef={errRef}
        userRef={userRef}
        handleSubmit={handleSubmit}
        />
        </>
    )
};