import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { LoginForm } from "../../../components/LoginForm/LoginForm";
import axios from "../../../api/axios";
import "./Login.css";

const LOGIN_URL = "/api/users/login";
const GOOGLE_LOGIN_URL = '/api/users/auth/google';
const PERSIST_URL = '/api/users/persist'




export default function Login({ setUser, isLoggedIn, setIsLoggedIn }) {

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
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
            username: username,
            password: pwd
        };

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify(formData),
                {
                    headers: { 
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
                // const user = response.data;
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
        <div className="login-main-container">
            <div className="login-image-overlay"></div>
            <div className="login-hero-image-container">
                <div className="login-hero-text-container">
                    <p>Join the club and discover..</p>
                    <h1>FITNESS IS FASHIONABLE</h1>
                    <div className="divider"></div>
                    <h2>Browse our contemporary collection and etch your very own style</h2>
                </div>
                
            </div>
            <main className="login-form-container">
                <div className="login-form-wrapper">
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
                <small className="login-or-header mt-6"><span>OR</span></small>
                <Link
                className='login-with-google-btn'
                to={'http://localhost:8080/api/users/auth/google'}
                >LOGIN WITH GOOGLE
                </Link>
                </div>
            </main>
        </div>
        
        </>
    )
};