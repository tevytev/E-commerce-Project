import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import SignupForm from "../../../components/SignUpForm/SignupForm";
import axios from "../../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/api/users/signup"
const PERSIST_URL = '/api/users/persist'

export default function Signup({ isLoggedIn, setIsLoggedIn, setUser, breadCrumb }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userData');
        setIsLoggedIn(null);
        setUser(null);
        }
    }, [isLoggedIn]);

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    const [formStarted, setFormStarted] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);

        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }

        const formData = {
            username: username,
            email: email,
            password: pwd
        };

        try {
            const response = await axios.post(SIGNUP_URL,
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
                const user = response.data;
                window.localStorage.setItem('userData', JSON.stringify(user));
                setUser(window.localStorage.getItem('userData'));
                navigate(breadCrumb);
                // console.log(user);

            }

        } catch (error) {

            console.log(error);
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error.response?.status === 409 && error.response?.data === 'Username already registered') {
                setErrMsg('Username already registered');
            } else if (error.response?.status === 409 && error.response?.data === 'Email already registered') {
                setErrMsg('Email already registered');
            }  else {
                setErrMsg('Registration failed');
            }
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
                    <h2>Browse our contemporary collection and etch your very own style</h2>
                </div>
                
            </div>
            <main className="login-form-container">
                <div className="login-form-wrapper">
                <SignupForm
                    username={username}
                    setUsername={setUsername}
                    validName={validName}
                    setValidName={setValidName}
                    email={email}
                    setEmail={setEmail}
                    validEmail={validEmail}
                    setValidEmail={setValidEmail}
                    emailFocus={emailFocus}
                    setEmailFocus={setEmailFocus}
                    pwd={pwd}
                    setPwd={setPwd}
                    setMatchPwd={setMatchPwd}
                    pwdFocus={pwdFocus}
                    setPwdFocus={setPwdFocus}
                    validPwd={validPwd}
                    setValidPwd={setValidPwd}
                    matchPwd={matchPwd}
                    setMatchPassword={setMatchPwd}
                    validMatch={validMatch}
                    setValidMatch={setValidMatch}
                    matchFocus={matchFocus}
                    setMatchFocus={setMatchFocus}
                    errMsg={errMsg}
                    setErrMsg={setErrMsg}
                    userFocus={userFocus}
                    setUserFocus={setUserFocus}
                    formStarted={formStarted}
                    setFormStarted={setFormStarted}
                    handleSubmit={handleSubmit}
                />
                <small className="login-or-header mt-6"><span>OR</span></small>
                <Link to={'https://tevdev-ecommerce.com/api/users/auth/google'} class="google-btn">
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