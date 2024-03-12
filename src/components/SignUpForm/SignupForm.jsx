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
        <div className="flex flex-col items-center h-auto w-full bg-white border-0 rounded-lg">
            <p className='mb-6'><svg className='h-20' id="logo-2" width="182" height="85" viewBox="0 0 132 35" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M30.52 12.25C30.88 12.25 31 12.38 31 12.73V20.65H35.07C35.42 20.65 35.55 20.78 35.55 21.13V21.83C35.55 22.18 35.42 22.31 35.07 22.31H29.71C29.36 22.31 29.22 22.18 29.22 21.83V12.73C29.22 12.38 29.36 12.25 29.71 12.25H30.52Z" className="ccustom" fill="#394149"></path> <path d="M39.1 15.74C39.1 13.43 40.56 12.04 43.1 12.04C45.64 12.04 47.1 13.43 47.1 15.74V18.82C47.1 21.13 45.63 22.52 43.1 22.52C40.57 22.52 39.1 21.13 39.1 18.82V15.74ZM45.42 15.74C45.42 14.44 44.61 13.74 43.15 13.74C41.69 13.74 40.89 14.45 40.89 15.74V18.84C40.89 20.15 41.69 20.84 43.15 20.84C44.61 20.84 45.42 20.12 45.42 18.84V15.74Z" className="ccustom" fill="#394149"></path> <path d="M59.01 16.8C59.4 16.8 59.49 16.93 59.49 17.28V19.18C59.5006 19.6275 59.4109 20.0718 59.2275 20.4801C59.044 20.8885 58.7716 21.2506 58.43 21.54C57.5817 22.2155 56.5121 22.5506 55.43 22.48C52.84 22.48 51.43 21.09 51.43 18.78V15.68C51.43 13.4 52.89 12 55.43 12C57.43 12 58.73 12.79 59.28 14.37C59.3108 14.4294 59.3273 14.4951 59.3282 14.5619C59.3291 14.6288 59.3144 14.695 59.2853 14.7551C59.2562 14.8153 59.2134 14.8679 59.1604 14.9087C59.1074 14.9494 59.0456 14.9773 58.98 14.99L58.2 15.26C57.86 15.38 57.72 15.31 57.6 14.96C57.4343 14.5329 57.131 14.1731 56.738 13.9377C56.345 13.7023 55.8848 13.6045 55.43 13.66C53.96 13.66 53.16 14.37 53.16 15.66V18.84C53.16 20.15 53.97 20.84 55.43 20.84C56.89 20.84 57.79 20.17 57.79 19.19V18.45H55.62C55.26 18.45 55.13 18.31 55.13 17.96V17.28C55.13 16.93 55.26 16.8 55.62 16.8H59.01Z" className="ccustom" fill="#394149"></path> <path d="M63.62 15.74C63.62 13.43 65.08 12.04 67.62 12.04C70.16 12.04 71.62 13.43 71.62 15.74V18.82C71.62 21.13 70.15 22.52 67.62 22.52C65.09 22.52 63.62 21.13 63.62 18.82V15.74ZM69.93 15.74C69.93 14.44 69.12 13.74 67.67 13.74C66.22 13.74 65.4 14.45 65.4 15.74V18.84C65.4 20.15 66.21 20.84 67.67 20.84C69.13 20.84 69.93 20.12 69.93 18.84V15.74Z" className="ccustom" fill="#394149"></path> <path d="M76.33 12.54C76.33 12.32 76.4 12.25 76.62 12.25H77.08C77.3 12.25 77.35 12.32 77.35 12.54V22.02C77.35 22.24 77.35 22.31 77.08 22.31H76.62C76.4 22.31 76.33 22.24 76.33 22.02V12.54Z" className="ccustom" fill="#394149"></path> <path d="M86.46 12.25C87.2928 12.25 88.0914 12.5808 88.6803 13.1697C89.2692 13.7585 89.6 14.5572 89.6 15.39C89.6 16.2228 89.2692 17.0215 88.6803 17.6103C88.0914 18.1992 87.2928 18.53 86.46 18.53H83.46V22.02C83.46 22.24 83.41 22.31 83.2 22.31H82.73C82.52 22.31 82.44 22.24 82.44 22.02V12.54C82.44 12.32 82.52 12.25 82.73 12.25H86.46ZM86.37 17.54C86.6563 17.54 86.9398 17.4836 87.2043 17.3741C87.4687 17.2645 87.7091 17.1039 87.9115 16.9015C88.1139 16.6991 88.2745 16.4587 88.3841 16.1943C88.4936 15.9298 88.55 15.6463 88.55 15.36C88.55 15.0737 88.4936 14.7902 88.3841 14.5257C88.2745 14.2613 88.1139 14.0209 87.9115 13.8185C87.7091 13.6161 87.4687 13.4555 87.2043 13.3459C86.9398 13.2364 86.6563 13.18 86.37 13.18H83.37V17.54H86.37Z" className="ccustom" fill="#394149"></path> <path d="M97.41 12.05C98.1821 11.9648 98.961 12.1309 99.6312 12.5236C100.301 12.9164 100.827 13.5148 101.13 14.23C101.21 14.39 101.13 14.52 100.97 14.6L100.53 14.8C100.35 14.87 100.28 14.86 100.17 14.67C99.9434 14.1392 99.5539 13.6942 99.0577 13.3994C98.5616 13.1046 97.9845 12.9752 97.41 13.03C95.72 13.03 94.8 13.7 94.8 14.9C94.7902 15.2667 94.9133 15.6247 95.1468 15.9077C95.3802 16.1907 95.7081 16.3798 96.07 16.44C96.6078 16.6154 97.1655 16.7229 97.73 16.76C98.4133 16.7964 99.0874 16.9346 99.73 17.17C100.223 17.3259 100.647 17.6465 100.931 18.0781C101.215 18.5097 101.342 19.0259 101.29 19.54C101.29 21.41 99.93 22.54 97.43 22.54C96.61 22.6338 95.7826 22.4438 95.0857 22.0016C94.3888 21.5595 93.8644 20.8918 93.6 20.11C93.5823 20.0744 93.5728 20.0353 93.572 19.9955C93.5712 19.9557 93.5793 19.9163 93.5955 19.88C93.6117 19.8437 93.6358 19.8114 93.666 19.7855C93.6961 19.7595 93.7316 19.7406 93.77 19.73L94.21 19.57C94.2446 19.5558 94.2819 19.549 94.3193 19.55C94.3567 19.551 94.3935 19.5598 94.4274 19.5758C94.4612 19.5918 94.4914 19.6146 94.5159 19.6429C94.5405 19.6712 94.5589 19.7042 94.57 19.74C94.7937 20.3049 95.1915 20.7839 95.7057 21.1076C96.2199 21.4312 96.8239 21.5827 97.43 21.54C99.32 21.54 100.25 20.88 100.25 19.54C100.268 19.1878 100.16 18.8407 99.9454 18.5605C99.7312 18.2804 99.4245 18.0853 99.08 18.01C98.5626 17.8557 98.029 17.7617 97.49 17.73L96.41 17.59C96.072 17.5183 95.7382 17.4281 95.41 17.32C95.0858 17.2221 94.7836 17.0625 94.52 16.85C94.2547 16.6098 94.0456 16.3142 93.9073 15.9841C93.7691 15.654 93.7051 15.2976 93.72 14.94C93.79 13.19 95.1 12.05 97.41 12.05Z" className="ccustom" fill="#394149"></path> <path d="M106.68 18.89C106.722 19.5972 107.033 20.2615 107.549 20.7472C108.065 21.2329 108.747 21.5033 109.455 21.5033C110.163 21.5033 110.845 21.2329 111.361 20.7472C111.877 20.2615 112.187 19.5972 112.23 18.89V12.54C112.23 12.32 112.3 12.25 112.52 12.25H112.98C113.2 12.25 113.27 12.32 113.27 12.54V18.88C113.27 21.15 111.93 22.52 109.46 22.52C106.99 22.52 105.65 21.15 105.65 18.88V12.54C105.65 12.32 105.72 12.25 105.93 12.25H106.4C106.61 12.25 106.68 12.32 106.68 12.54V18.89Z" className="ccustom" fill="#394149"></path> <path d="M127.07 12.25C127.29 12.25 127.36 12.32 127.36 12.54V22.02C127.36 22.24 127.29 22.31 127.07 22.31H126.65C126.44 22.31 126.37 22.24 126.37 22.02V16.25C126.37 15.4105 126.427 14.5719 126.54 13.74H126.48C126.168 14.5007 125.803 15.2391 125.39 15.95L123.24 19.74C123.214 19.8058 123.168 19.862 123.109 19.9013C123.05 19.9405 122.981 19.961 122.91 19.96H122.63C122.558 19.9604 122.488 19.9397 122.427 19.9007C122.367 19.8616 122.319 19.8058 122.29 19.74L120.11 15.91C119.723 15.2093 119.389 14.4806 119.11 13.73H119.05C119.152 14.5695 119.206 15.4143 119.21 16.26V22.02C119.21 22.24 119.14 22.31 118.92 22.31H118.53C118.31 22.31 118.24 22.24 118.24 22.02V12.54C118.24 12.32 118.31 12.25 118.53 12.25H118.89C118.972 12.2424 119.055 12.2603 119.126 12.3015C119.198 12.3427 119.255 12.4051 119.29 12.48L122.79 18.7L126.27 12.54C126.38 12.33 126.44 12.3 126.66 12.3L127.07 12.25Z" className="ccustom" fill="#394149"></path> <path d="M12.73 20.79V28.02C12.73 28.2972 12.6199 28.563 12.4239 28.7589C12.228 28.9549 11.9622 29.065 11.685 29.065C11.4079 29.065 11.1421 28.9549 10.9461 28.7589C10.7501 28.563 10.64 28.2972 10.64 28.02V20.8C10.931 21.0125 11.2798 21.1311 11.64 21.14C12.0326 21.1512 12.4173 21.0277 12.73 20.79V20.79ZM21.63 18.7C21.3648 18.7 21.1104 18.8054 20.9229 18.9929C20.7354 19.1804 20.63 19.4348 20.63 19.7V20.96C20.63 21.2372 20.7401 21.503 20.9361 21.6989C21.132 21.8949 21.3978 22.005 21.675 22.005C21.9522 22.005 22.218 21.8949 22.4139 21.6989C22.6099 21.503 22.72 21.2372 22.72 20.96V19.75C22.7278 19.6066 22.7046 19.4632 22.652 19.3296C22.5994 19.196 22.5187 19.0752 22.4152 18.9756C22.3118 18.876 22.1881 18.7998 22.0527 18.7522C21.9172 18.7047 21.773 18.6869 21.63 18.7V18.7ZM8.37 23.53C8.01017 23.5192 7.66183 23.4008 7.37 23.19V30.44C7.37 30.7185 7.48062 30.9856 7.67754 31.1825C7.87445 31.3794 8.14152 31.49 8.42 31.49C8.69848 31.49 8.96555 31.3794 9.16246 31.1825C9.35938 30.9856 9.47 30.7185 9.47 30.44V23.24C9.14345 23.4511 8.75816 23.5527 8.37 23.53V23.53ZM18.37 16.53C18.2345 16.5232 18.0991 16.5441 17.9719 16.5913C17.8448 16.6385 17.7286 16.7111 17.6303 16.8046C17.5321 16.8982 17.454 17.0107 17.4006 17.1354C17.3473 17.2601 17.3198 17.3944 17.32 17.53V23.1C17.32 23.3785 17.4306 23.6456 17.6275 23.8425C17.8245 24.0394 18.0915 24.15 18.37 24.15C18.6485 24.15 18.9156 24.0394 19.1125 23.8425C19.3094 23.6456 19.42 23.3785 19.42 23.1V17.6C19.428 17.4557 19.4046 17.3114 19.3514 17.177C19.2982 17.0426 19.2166 16.9213 19.112 16.8215C19.0074 16.7217 18.8825 16.6457 18.7458 16.5989C18.6091 16.552 18.4638 16.5353 18.32 16.55L18.37 16.53ZM15.05 18.67C14.6733 18.6674 14.3067 18.5487 14 18.33V25.6C14 25.8785 14.1106 26.1456 14.3075 26.3425C14.5045 26.5394 14.7715 26.65 15.05 26.65C15.3285 26.65 15.5955 26.5394 15.7925 26.3425C15.9894 26.1456 16.1 25.8785 16.1 25.6V18.34C15.7828 18.5763 15.3955 18.6995 15 18.69L15.05 18.67ZM6.1 24.24V3.93C6.09737 3.68243 5.99717 3.44591 5.82117 3.27178C5.64517 3.09765 5.40758 2.99999 5.16 3H4.94C4.69242 2.99999 4.45483 3.09765 4.27883 3.27178C4.10283 3.44591 4.00263 3.68243 4 3.93V24.24C4 24.4893 4.09904 24.7284 4.27532 24.9047C4.4516 25.081 4.6907 25.18 4.94 25.18H5.16C5.40931 25.18 5.6484 25.081 5.82468 24.9047C6.00097 24.7284 6.1 24.4893 6.1 24.24V24.24ZM8.48 22.76H8.26C8.0107 22.76 7.7716 22.661 7.59532 22.4847C7.41904 22.3084 7.32 22.0693 7.32 21.82V6.35C7.32264 6.10244 7.42283 5.8659 7.59883 5.69178C7.77483 5.51765 8.01242 5.41999 8.26 5.42H8.48C8.72758 5.41999 8.96517 5.51765 9.14117 5.69178C9.31717 5.8659 9.41737 6.10244 9.42 6.35V21.84C9.42 22.0893 9.32096 22.3284 9.14468 22.5047C8.9684 22.681 8.7293 22.78 8.48 22.78V22.76ZM11.79 20.38H11.56C11.3134 20.38 11.0768 20.282 10.9024 20.1076C10.728 19.9332 10.63 19.6967 10.63 19.45V8.75C10.6287 8.62703 10.6518 8.50502 10.6979 8.39103C10.744 8.27704 10.8123 8.17334 10.8988 8.08592C10.9853 7.9985 11.0883 7.9291 11.2018 7.88174C11.3153 7.83438 11.437 7.80999 11.56 7.81H11.79C12.0376 7.81264 12.2741 7.91283 12.4482 8.08883C12.6224 8.26483 12.72 8.50242 12.72 8.75V19.45C12.72 19.6967 12.622 19.9332 12.4476 20.1076C12.2732 20.282 12.0367 20.38 11.79 20.38V20.38ZM15.1 17.93H14.89C14.6424 17.93 14.4048 17.8324 14.2288 17.6582C14.0528 17.4841 13.9526 17.2476 13.95 17V11.24C13.9418 11.1116 13.96 10.9829 14.0036 10.8618C14.0471 10.7408 14.1151 10.6299 14.2032 10.5362C14.2913 10.4424 14.3977 10.3678 14.5159 10.3168C14.634 10.2659 14.7613 10.2397 14.89 10.24H15.11C15.3593 10.24 15.5984 10.339 15.7747 10.5153C15.951 10.6916 16.05 10.9307 16.05 11.18V16.98C16.0513 17.1043 16.028 17.2276 15.9813 17.3428C15.9347 17.458 15.8657 17.5628 15.7782 17.6512C15.6908 17.7395 15.5868 17.8096 15.472 17.8575C15.3573 17.9054 15.2343 17.93 15.11 17.93H15.1ZM18.42 15.78H18.2C17.9507 15.78 17.7116 15.681 17.5353 15.5047C17.359 15.3284 17.26 15.0893 17.26 14.84V13.35C17.2626 13.1024 17.3628 12.8659 17.5388 12.6918C17.7148 12.5176 17.9524 12.42 18.2 12.42H18.42C18.6676 12.42 18.9052 12.5176 19.0812 12.6918C19.2572 12.8659 19.3574 13.1024 19.36 13.35V14.84C19.36 15.0876 19.2624 15.3252 19.0882 15.5012C18.9141 15.6772 18.6776 15.7774 18.43 15.78H18.42Z" className="ccustom" fill="#394149"></path> </svg></p>
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

                <div className='entry-area mb-6 mt-6'>
                <input 
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                type="text"
                id='username'
                ref={userRef}
                autoComplete='off'
                required
                value={username}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />
                    <div className='labelline'>Username</div>
                </div>
                <p
                id='uidnote'
                className={userFocus && username && !validName ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
                </p>

                <div className='entry-area mb-6'>
                    <input onChange={(e) => {
                        setEmail(e.target.value);
                    }} 
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
                    <div className='labelline'>Email</div>
                </div>
                <p
                id='emailnote'
                className={emailFocus && !validEmail ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email.
                </p>

                <div className='entry-area mb-6'>
                    <input 
                    onChange={(e) => {
                        setPwd(e.target.value);
                    }} 
                    type="password" 
                    id='password' 
                    value={pwd} 
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    />
                    <div className='labelline'>Password</div>
                </div>
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

                <div className='entry-area mb-6'>
                    <input 
                    onChange={(e) => {
                        setMatchPwd(e.target.value);
                    }}
                    type="password" 
                    id='confirm-password' 
                    value={matchPwd} 
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    />
                    <div className='labelline'>Confirm Password</div>
                </div>
                <p
                id='confirmnote'
                className={matchFocus && !validMatch ? "text-left bg-night text-white p-2 mb-6 rounded-sm font-light text-xs" : "hidden"}
                >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
                </p>

                <button 
                disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}
                className='auth-submit-btn text-white bg-gradient-to-r mb-6 bg-black py-2 px-10 rounded-full drop-shadow-lg disabled:opacity-75 disabled:cursor-not-allowed' 
                >CREATE ACCOUNT</button>
                <small>Already have an account? <Link className='text-primaryColor hover:underline underline-offset-1 font-bold' to="/login">Login</Link></small>
            </form>
        </div>
        </>
    )
}