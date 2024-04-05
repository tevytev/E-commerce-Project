import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { LoginForm } from "../../../components/LoginForm/LoginForm";
import axios from "../../../api/axios";
import "./Login.css";

const LOGIN_URL = "/api/users/login";
const GOOGLE_LOGIN_URL = '/api/users/auth/google';
const PERSIST_URL = '/api/users/persist'

export default function Login({ setUser, isLoggedIn, setIsLoggedIn, breadCrumb }) {

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
                if (breadCrumb === '/cart' || breadCrumb === '/wishlist') {
                    navigate('/home');
                } else {
                    navigate(breadCrumb);
                }
                
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
                    {/* <div className="divider"></div> */}
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
                <Link to={'https://api.tevdev-ecommerce.com/api/users/oauth2/google'} class="google-btn">
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                </svg>
                Continue with Google
                </Link>

                </div>
            </main>
        </div>
        
        </>
    )
};