import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { SignupForm } from "../features/SignupForm"
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "/api/users/signup"

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
            userName: username,
            email: email,
            password: pwd
        };

        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify(formData),
                {
                    headers: { 
                        // 'withCredentials': 'true',
                        "Content-Type": "application/json" 
                    },
                    withCredentials: true
                }
            );

            if (response) {

                window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
                setIsLoggedIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
                const user = response.data;
                user.newUser = true;
                window.localStorage.setItem('userData', JSON.stringify(user));
                setUser(window.localStorage.getItem('userData'));
                // setAuth({user})
                navigate('/home');
                // console.log(user);

            }

        } catch (error) {

            console.log(error);
            if (!error?.response) {
                setErrMsg('No server response')
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
        </>
    )
};