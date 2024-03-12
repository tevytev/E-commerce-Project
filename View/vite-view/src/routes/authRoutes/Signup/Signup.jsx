import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { SignupForm } from "../../../components/SignupForm/SignupForm"
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/api/users/signup"
const PERSIST_URL = '/api/users/persist'

export default function Signup({ isLoggedIn, setIsLoggedIn, setUser }) {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userData');
        setIsLoggedIn(null);
        setUser(null);
        }
    }, [isLoggedIn]);

    const [username, setUsername] = useState('Tevin');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('tev@gmail.com');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('Bridget1003!');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('Bridget1003!');
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
                // setAuth({user})
                navigate('/home');
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
                    <div className="divider"></div>
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