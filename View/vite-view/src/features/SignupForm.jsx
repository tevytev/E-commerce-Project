import '../index.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const SignupForm = (props) => {

    const {
        username,
        setUsername,
        validName,
        setValidName,
        email,
        setEmail,
        validEmail,
        setValidEmail,
        emailFocus,
        setEmailFocus,
        pwd,
        setPwd,
        pwdFocus,
        setPwdFocus,
        validPwd,
        setValidPwd,
        matchPwd,
        setMatchPwd,
        validMatch,
        setValidMatch,
        matchFocus,
        setMatchFocus,
        errMsg,
        setErrMsg,
        userFocus,
        setUserFocus,
        formStarted,
        setFormStarted,
        handleSubmit
    } = props;

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);
    
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        if (username || email || pwd || matchPwd) {
            setFormStarted(true);
        } else {
            setFormStarted(false);
        }
    }, [username, email, pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');

    }, [username, pwd, matchPwd])

    return (
        <>
        <div className="flex flex-col items-center h-auto w-1/4 p-6 px-10 drop-shadow-2xl bg-white border-0 rounded-lg">
            <h1 className='text-2xl font-bold text-night'>Sign up</h1>
            {/* <div className=' w-10 h-1 bg-primaryColor mt-1'></div> */}
            <p ref={errRef} className={errMsg ? "bg-red-100 text-red-500 w-full text-center p-2 mt-6 rounded-sm " : "hidden"} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={handleSubmit} className='h-auto w-full flex flex-col justify-center items-stretch text-center'>
                <label className={formStarted ? 'mt-4' : "hidden"} htmlFor="username">
                    <span className={validName && validEmail && validPwd && validMatch && !errMsg ? "text-green-500 text-2xl" : "hidden"}>
                        <FontAwesomeIcon size='xl' icon={faCircleCheck} />
                    </span>
                    <span className={!validName || !validEmail || !validPwd || !validMatch && !errMsg? " text-red-500 text-2xl" : "hidden"}>
                        <FontAwesomeIcon size='xl' icon={faCircleXmark} />
                    </span>
                </label>
                <input 
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                type="text"
                id='username'
                placeholder='username'
                ref={userRef}
                autoComplete='off'
                required
                className="w-full h-5v mb-6 mt-6 p-3 border-b-2 border-slate-200 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor"
                value={username}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />
                <p
                id='uidnote'
                className={userFocus && username && !validName ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="email"></label>
                <input onChange={(e) => {
                    setEmail(e.target.value);
                }} 
                placeholder='email' 
                className="w-full h-5v mb-6 p-3 border-b-2 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor" 
                type="email" 
                id='email' 
                value={email} 
                required
                autoComplete='off'
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                />
                <p
                id='emailnote'
                className={emailFocus && !validEmail ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email.
                </p>

                <label htmlFor="password"></label>
                <input 
                onChange={(e) => {
                    setPwd(e.target.value);
                }} 
                placeholder='password' 
                className="w-full h-5v mb-6 p-3 border-b-2 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor" 
                type="password" 
                id='password' 
                value={pwd} 
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                />
                <p
                id='pwdnote'
                className={pwdFocus && !validPwd ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number, and a special character.<br />
                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                <span aria-label='at symbol'>@</span>
                <span aria-label='hashtag'>#</span>
                <span aria-label='dollar sign'>$</span>
                <span aria-label='percent'>%</span>
                </p>

                <label htmlFor="confirm-password"></label>
                <input 
                onChange={(e) => {
                    setMatchPwd(e.target.value);
                }} 
                placeholder='confirm password' 
                className="w-full h-5v mb-6 p-3 border-b-2 text-slate-700 bg-slate-100 rounded-sm ease-in duration-200 focus:outline-none focus:border-primaryColor" 
                type="password" 
                id='confirm-password' 
                value={matchPwd} 
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                />
                <p
                id='confirmnote'
                className={matchFocus && !validMatch ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
                </p>

                <button 
                disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}
                className='text-white bg-gradient-to-r mb-6 from-cyan-500 to-blue-500 py-2 px-10 rounded-full drop-shadow-lg disabled:opacity-75 disabled:cursor-not-allowed' 
                >CREATE ACCOUNT</button>
                <small>Already have an account? <Link className='text-primaryColor hover:underline underline-offset-1' to="/login">Login</Link></small>
            </form>
        </div>
        </>
    )
}