import '../index.css';
import { useRef, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const LoginForm = (props) => {

    const {
        username,
        setUsername,
        emailFocus,
        setEmailFocus,
        pwd,
        setPwd,
        passwordFocus,
        setPasswordFocus,
        errMsg,
        setErrMsg,
        errRef,
        userRef,
        handleSubmit
    } = props;

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd])

    // useEffect(() => {
    //     const result = EMAIL_REGEX.test(email);
    //     console.log(`email: ${email}`);
    //     setValidEmail(result);
    // }, [email])

    // useEffect(() => {
    //     const result = PWD_REGEX.test(password);
    //     console.log(result);
    //     console.log(password);
    //     setValidPassword(result);
    // }, [password])

    return (
        <>
        <div className="flex flex-col items-center h-auto w-1/4 p-6 px-10 drop-shadow-2xl bg-white border-0 rounded-lg">
            <h1 className='text-2xl font-bold text-night'>Login</h1>
            <p ref={errRef} className={errMsg ? "bg-red-100 text-red-500 w-full text-center p-2 mt-6 rounded-sm " : "hidden"} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col justify-center items-center'>
                <input onChange={(e) => {
                    setUsername(e.target.value);
                }} 
                placeholder='username' 
                className="w-full h-5v mb-6 mt-6 p-3 border-b-2 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor" 
                type="text" 
                id='username' 
                ref={userRef}
                value={username} 
                required 
                autoComplete='off'
                />

                <input onChange={(e) => {
                    setPwd(e.target.value);
                }} 
                placeholder='password' 
                className="w-full h-5v mb-6 p-3 border-b-2 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor" 
                type="password" 
                id='password' 
                value={pwd} 
                required 
                />

                <button
                disabled={username && pwd ? false : true}
                className='text-white bg-gradient-to-r mb-6 from-cyan-500 to-blue-500 py-2 px-10 rounded-full drop-shadow-lg disabled:opacity-75 disabled:cursor-not-allowed'
                >LOGIN</button>
                <small>Don't have an account? <Link className='text-primaryColor hover:underline underline-offset-1' to="/signup">Sign up</Link></small>
            </form>
        </div>
        </>
    )
}