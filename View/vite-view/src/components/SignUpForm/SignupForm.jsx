import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignupForm(props) {

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
            <Link to={'/home'} className='mb-6'><svg id="auth-logo" width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.419 13.371C22.04 13.7523 21.7498 14.2125 21.569 14.7187C21.3882 15.225 21.3213 15.7649 21.373 16.3L21.355 16.282C21.4082 16.9119 21.3232 17.5457 21.1061 18.1394C20.889 18.733 20.545 19.2721 20.0981 19.7191C19.6511 20.166 19.112 20.5101 18.5183 20.7271C17.9247 20.9442 17.2908 21.0292 16.661 20.976L16.679 20.994C15.9256 20.9239 15.1689 21.0878 14.512 21.4635C13.8552 21.8392 13.3302 22.4083 13.0087 23.0933C12.6872 23.7783 12.5847 24.5457 12.7153 25.2911C12.846 26.0364 13.2033 26.7233 13.7386 27.2581C14.2739 27.7929 14.9611 28.1496 15.7065 28.2795C16.452 28.4095 17.2193 28.3063 17.904 27.9842C18.5887 27.662 19.1573 27.1366 19.5324 26.4794C19.9075 25.8222 20.0708 25.0654 20 24.312L20.019 24.33C19.9658 23.7002 20.0507 23.0663 20.2678 22.4726C20.4849 21.879 20.829 21.3399 21.2759 20.8929C21.7229 20.446 22.262 20.1019 22.8556 19.8849C23.4493 19.6678 24.0831 19.5828 24.713 19.636L24.694 19.618C25.3094 19.6733 25.9289 19.5724 26.495 19.3246C27.061 19.0768 27.5554 18.6901 27.9322 18.2004C28.309 17.7107 28.5562 17.1337 28.6506 16.5231C28.7451 15.9124 28.6839 15.2878 28.4727 14.707C28.2615 14.1263 27.9071 13.6083 27.4424 13.201C26.9777 12.7937 26.4177 12.5103 25.8143 12.3771C25.2109 12.2439 24.5836 12.2651 23.9906 12.4388C23.3976 12.6126 22.8581 12.9332 22.422 13.371H22.419Z" class="ccompli2" style={{fill : '#1F84FF'}}></path> <path d="M15.042 18.636L15.023 18.618C15.5583 18.6719 16.0989 18.6062 16.6058 18.4256C17.1126 18.245 17.573 17.9541 17.9536 17.5738C18.3341 17.1935 18.6255 16.7333 18.8064 16.2266C18.9874 15.7199 19.0535 15.1794 19 14.644L19.019 14.662C18.9658 14.0321 19.0508 13.3983 19.2678 12.8046C19.4849 12.211 19.829 11.6719 20.2759 11.2249C20.7229 10.778 21.262 10.4339 21.8556 10.2169C22.4493 9.99976 23.0831 9.91483 23.713 9.968L23.694 9.95C24.4475 10.0208 25.2044 9.85736 25.8616 9.4821C26.5189 9.10684 27.0443 8.53797 27.3663 7.8531C27.6883 7.16824 27.7912 6.40071 27.661 5.6552C27.5308 4.90969 27.1738 4.22251 26.6386 3.68737C26.1035 3.15224 25.4163 2.7952 24.6708 2.66498C23.9253 2.53475 23.1578 2.63766 22.4729 2.95968C21.788 3.28169 21.2192 3.80714 20.8439 4.46435C20.4686 5.12155 20.3052 5.87852 20.376 6.632L20.358 6.613C20.4113 7.24289 20.3265 7.87683 20.1095 8.47055C19.8925 9.06427 19.5484 9.60346 19.1015 10.0505C18.6545 10.4974 18.1153 10.8415 17.5216 11.0585C16.9278 11.2755 16.2939 11.3603 15.664 11.307L15.682 11.326C15.1467 11.2721 14.606 11.3378 14.0992 11.5184C13.5924 11.6989 13.132 11.9899 12.7514 12.3702C12.3708 12.7505 12.0795 13.2107 11.8985 13.7174C11.7176 14.2241 11.6515 14.7646 11.705 15.3L11.687 15.282C11.74 15.9118 11.6549 16.5456 11.4378 17.1392C11.2206 17.7327 10.8766 18.2718 10.4297 18.7187C9.98276 19.1656 9.44372 19.5096 8.85016 19.7268C8.2566 19.9439 7.62281 20.029 6.993 19.976L7.011 19.994C6.25752 19.9232 5.50055 20.0866 4.84334 20.4619C4.18614 20.8372 3.66069 21.406 3.33868 22.0909C3.01666 22.7758 2.91374 23.5433 3.04397 24.2888C3.1742 25.0343 3.53124 25.7215 4.06637 26.2566C4.60151 26.7918 5.28869 27.1488 6.0342 27.279C6.77971 27.4092 7.54724 27.3063 8.23211 26.9843C8.91697 26.6623 9.48584 26.1369 9.8611 25.4797C10.2364 24.8224 10.3998 24.0655 10.329 23.312L10.348 23.33C10.2948 22.7001 10.3798 22.0663 10.5969 21.4726C10.8139 20.879 11.158 20.3399 11.6049 19.8929C12.0519 19.446 12.591 19.1019 13.1846 18.8849C13.7783 18.6678 14.4121 18.5828 15.042 18.636V18.636Z" class="ccompli1" style={{fill : '#0065E0'}}></path> <path d="M8.34 16.629C8.71902 16.2478 9.0092 15.7876 9.18984 15.2813C9.37048 14.775 9.43712 14.235 9.385 13.7L9.40399 13.718C9.35079 13.088 9.43575 12.4539 9.65296 11.8601C9.87017 11.2663 10.2144 10.7271 10.6616 10.2801C11.1088 9.83312 11.6481 9.48913 12.242 9.27218C12.8359 9.05522 13.47 8.97052 14.1 9.024L14.081 9.006C14.8342 9.07657 15.5909 8.91308 16.2478 8.53784C16.9047 8.16261 17.4298 7.59388 17.7517 6.90923C18.0735 6.22457 18.1763 5.45732 18.0461 4.71209C17.9159 3.96686 17.5589 3.27994 17.024 2.745C16.4891 2.21006 15.8021 1.85314 15.0569 1.72292C14.3117 1.59269 13.5444 1.69551 12.8598 2.01733C12.1751 2.33915 11.6064 2.86432 11.2312 3.52122C10.8559 4.17812 10.6924 4.93478 10.763 5.688L10.745 5.67C10.7982 6.29985 10.7132 6.93372 10.4961 7.52736C10.279 8.121 9.93502 8.66011 9.48806 9.10707C9.04111 9.55403 8.50199 9.89806 7.90835 10.1151C7.31471 10.3322 6.68085 10.4172 6.051 10.364L6.069 10.382C5.45357 10.3268 4.83416 10.4279 4.26818 10.6758C3.7022 10.9237 3.20795 11.3105 2.83124 11.8003C2.45453 12.29 2.20755 12.867 2.11317 13.4776C2.0188 14.0883 2.08009 14.7129 2.29136 15.2935C2.50263 15.8742 2.85706 16.3921 3.32179 16.7993C3.78652 17.2066 4.34652 17.4899 4.9499 17.6231C5.55327 17.7562 6.1805 17.7349 6.77347 17.5612C7.36643 17.3874 7.90593 17.0668 8.34199 16.629H8.34Z" class="ccustom" style={{fill : '#0053B8'}}></path> <path d="M39.317 6.655H42.287V21.108H39.317V6.655Z" class="cneutral" fill="#394149"></path> <path d="M43.969 16.159C43.9649 15.1204 44.2691 14.1038 44.8431 13.2382C45.4171 12.3726 46.2351 11.6968 47.1935 11.2965C48.1519 10.8961 49.2075 10.7892 50.2267 10.9893C51.2459 11.1894 52.1828 11.6874 52.9187 12.4204C53.6546 13.1533 54.1564 14.0882 54.3606 15.1066C54.5648 16.125 54.4621 17.1811 54.0656 18.1411C53.6691 19.101 52.9966 19.9218 52.1333 20.4992C51.2699 21.0767 50.2547 21.385 49.216 21.385C48.5266 21.3929 47.8425 21.2632 47.2037 21.0036C46.5649 20.744 45.9843 20.3597 45.4958 19.8732C45.0072 19.3866 44.6206 18.8075 44.3585 18.1698C44.0963 17.5321 43.9639 16.8485 43.969 16.159ZM51.493 16.159C51.4806 15.7113 51.3365 15.2772 51.0788 14.9109C50.821 14.5447 50.461 14.2625 50.0438 14.0998C49.6265 13.937 49.1706 13.9008 48.7329 13.9958C48.2952 14.0908 47.8952 14.3126 47.5829 14.6337C47.2707 14.9547 47.0599 15.3607 46.9772 15.8009C46.8944 16.241 46.9431 16.6958 47.1174 17.1084C47.2917 17.521 47.5837 17.873 47.9569 18.1205C48.3302 18.368 48.7682 18.5 49.216 18.5C49.5227 18.5082 49.8278 18.4527 50.1121 18.3371C50.3963 18.2215 50.6535 18.0483 50.8674 17.8284C51.0813 17.6084 51.2474 17.3465 51.355 17.0592C51.4627 16.7719 51.5097 16.4654 51.493 16.159Z" class="cneutral" fill="#394149"></path> <path d="M66.3 11.209V20.609C66.3 23.935 63.706 25.341 61.073 25.341C60.146 25.4104 59.2177 25.2231 58.39 24.7998C57.5624 24.3764 56.8673 23.7333 56.381 22.941L58.915 21.476C59.1194 21.889 59.4451 22.2297 59.8484 22.4526C60.2518 22.6754 60.7136 22.7698 61.172 22.723C61.465 22.7636 61.7634 22.7378 62.0451 22.6475C62.3267 22.5572 62.5845 22.4047 62.7993 22.2014C63.0141 21.998 63.1804 21.749 63.286 21.4726C63.3915 21.1963 63.4335 20.8998 63.409 20.605V19.7C63.0612 20.1255 62.6186 20.4636 62.1165 20.6871C61.6144 20.9106 61.067 21.0133 60.518 20.987C59.2118 20.9458 57.9729 20.398 57.0635 19.4594C56.1541 18.5209 55.6456 17.2653 55.6456 15.9585C55.6456 14.6517 56.1541 13.3961 57.0635 12.4576C57.9729 11.519 59.2118 10.9712 60.518 10.93C61.067 10.9037 61.6144 11.0064 62.1165 11.2299C62.6186 11.4534 63.0612 11.7915 63.409 12.217V11.207L66.3 11.209ZM63.41 15.96C63.43 15.4814 63.3062 15.0077 63.0547 14.6C62.8032 14.1922 62.4354 13.8691 61.9987 13.6722C61.562 13.4752 61.0764 13.4135 60.6043 13.4949C60.1322 13.5763 59.6953 13.7971 59.3497 14.129C59.0042 14.4608 58.7659 14.8884 58.6654 15.3568C58.565 15.8252 58.607 16.313 58.7862 16.7573C58.9653 17.2016 59.2733 17.5822 59.6705 17.85C60.0677 18.1178 60.536 18.2606 61.015 18.26C61.3271 18.2818 61.6402 18.238 61.9343 18.1314C62.2284 18.0248 62.4969 17.8577 62.7225 17.6411C62.9481 17.4244 63.1259 17.1629 63.2443 16.8733C63.3627 16.5838 63.4192 16.2727 63.41 15.96Z" class="cneutral" fill="#394149"></path> <path d="M67.982 16.159C67.9779 15.1204 68.282 14.1038 68.8561 13.2382C69.4301 12.3726 70.2481 11.6968 71.2065 11.2965C72.1649 10.8961 73.2205 10.7892 74.2397 10.9893C75.2589 11.1894 76.1958 11.6874 76.9317 12.4204C77.6676 13.1533 78.1694 14.0882 78.3736 15.1066C78.5778 16.125 78.4751 17.1811 78.0786 18.1411C77.6821 19.101 77.0096 19.9218 76.1463 20.4992C75.2829 21.0767 74.2677 21.385 73.229 21.385C72.5396 21.3929 71.8554 21.2632 71.2167 21.0036C70.5779 20.744 69.9973 20.3597 69.5088 19.8732C69.0202 19.3866 68.6336 18.8075 68.3715 18.1698C68.1093 17.5321 67.9769 16.8485 67.982 16.159ZM75.506 16.159C75.4936 15.7113 75.3495 15.2772 75.0918 14.9109C74.834 14.5447 74.474 14.2625 74.0568 14.0998C73.6395 13.937 73.1835 13.9008 72.7459 13.9958C72.3082 14.0908 71.9082 14.3126 71.5959 14.6337C71.2837 14.9547 71.0729 15.3607 70.9901 15.8009C70.9073 16.241 70.9561 16.6958 71.1304 17.1084C71.3047 17.521 71.5967 17.873 71.9699 18.1205C72.3432 18.368 72.7811 18.5 73.229 18.5C73.5357 18.5082 73.8408 18.4527 74.125 18.3371C74.4093 18.2215 74.6665 18.0483 74.8804 17.8284C75.0943 17.6084 75.2604 17.3465 75.368 17.0592C75.4757 16.7719 75.5227 16.4654 75.506 16.159Z" class="cneutral" fill="#394149"></path> <path d="M79.861 8.556C79.861 8.20355 79.9655 7.85902 80.1613 7.56598C80.3571 7.27293 80.6355 7.04452 80.9611 6.90965C81.2867 6.77477 81.645 6.73948 81.9907 6.80824C82.3363 6.877 82.6539 7.04672 82.9031 7.29594C83.1523 7.54515 83.322 7.86267 83.3908 8.20835C83.4595 8.55402 83.4242 8.91232 83.2894 9.23794C83.1545 9.56356 82.9261 9.84187 82.633 10.0377C82.34 10.2335 81.9955 10.338 81.643 10.338C81.1719 10.3333 80.7213 10.1441 80.3881 9.81088C80.055 9.4777 79.8657 9.02716 79.861 8.556ZM80.161 11.209H83.132V21.109H80.157L80.161 11.209Z" class="cneutral" fill="#394149"></path> <path d="M95.956 16.159C95.9903 16.8133 95.895 17.4679 95.6754 18.0852C95.4559 18.7025 95.1165 19.2703 94.6767 19.756C94.237 20.2416 93.7055 20.6356 93.113 20.9152C92.5204 21.1947 91.8785 21.3544 91.224 21.385C90.6736 21.415 90.1235 21.3222 89.6134 21.1133C89.1033 20.9043 88.6462 20.5845 88.275 20.177V25.068H85.305V11.209H88.275V12.139C88.6463 11.7318 89.1036 11.4122 89.6136 11.2035C90.1237 10.9947 90.6737 10.902 91.224 10.932C91.8786 10.9625 92.5207 11.1221 93.1134 11.4017C93.7061 11.6813 94.2376 12.0753 94.6774 12.5611C95.1172 13.0469 95.4566 13.6149 95.676 14.2324C95.8954 14.8498 95.9906 15.5046 95.956 16.159ZM92.986 16.159C92.9744 15.6957 92.8264 15.2461 92.5605 14.8664C92.2946 14.4868 91.9227 14.194 91.4913 14.0248C91.0598 13.8555 90.588 13.8172 90.1349 13.9148C89.6818 14.0123 89.2676 14.2413 88.944 14.5731C88.6204 14.905 88.4019 15.3248 88.3158 15.7803C88.2297 16.2357 88.2798 16.7063 88.4599 17.1334C88.6399 17.5605 88.942 17.9249 89.3282 18.1812C89.7144 18.4374 90.1675 18.5741 90.631 18.574C90.9492 18.5882 91.2668 18.5349 91.563 18.4177C91.8591 18.3006 92.1272 18.1221 92.3495 17.8941C92.5719 17.666 92.7435 17.3936 92.8532 17.0946C92.9629 16.7956 93.0082 16.4767 92.986 16.159Z" class="cneutral" fill="#394149"></path> <path d="M105.121 18.138C105.121 20.415 103.142 21.385 101.004 21.385C100.14 21.4632 99.2727 21.2806 98.5138 20.8605C97.7549 20.4405 97.1395 19.8025 96.747 19.029L99.32 17.564C99.4241 17.9215 99.6477 18.2326 99.9534 18.4451C100.259 18.6577 100.629 18.759 101 18.732C101.712 18.732 102.069 18.514 102.069 18.119C102.069 17.029 97.198 17.604 97.198 14.179C97.198 12.02 99.02 10.932 101.079 10.932C101.853 10.9075 102.619 11.0911 103.298 11.4636C103.977 11.8362 104.544 12.384 104.939 13.05L102.405 14.416C102.294 14.1567 102.109 13.9358 101.873 13.7809C101.637 13.626 101.361 13.544 101.079 13.545C100.564 13.545 100.247 13.745 100.247 14.099C100.251 15.228 105.121 14.475 105.121 18.138Z" class="cneutral" fill="#394149"></path> <path d="M115.97 11.209V21.109H113V20.178C112.657 20.5888 112.222 20.9125 111.73 21.1225C111.238 21.3325 110.704 21.4228 110.17 21.386C108.17 21.386 106.47 19.961 106.47 17.286V11.209H109.44V16.851C109.415 17.0868 109.442 17.3252 109.519 17.5495C109.595 17.7739 109.72 17.9789 109.884 18.1502C110.048 18.3215 110.247 18.455 110.468 18.5415C110.688 18.628 110.925 18.6654 111.162 18.651C112.251 18.651 113.003 18.018 113.003 16.612V11.212L115.97 11.209Z" class="cneutral" fill="#394149"></path> <path d="M133 15.03V21.108H130.03V15.287C130.03 14.297 129.555 13.664 128.605 13.664C127.615 13.664 127.06 14.357 127.06 15.525V21.108H124.091V15.287C124.091 14.297 123.616 13.664 122.665 13.664C121.675 13.664 121.121 14.357 121.121 15.525V21.108H118.151V11.208H121.121V12.118C121.429 11.7143 121.833 11.3941 122.296 11.1868C122.76 10.9794 123.268 10.8915 123.774 10.931C124.282 10.9061 124.788 11.0134 125.243 11.2423C125.697 11.4711 126.084 11.8139 126.367 12.237C126.696 11.7943 127.132 11.4423 127.634 11.2139C128.136 10.9855 128.688 10.8882 129.238 10.931C131.511 10.932 133 12.555 133 15.03Z" class="cneutral" fill="#394149"></path> <path d="M135.512 11.148C136.729 11.148 137.716 10.1612 137.716 8.944C137.716 7.72676 136.729 6.74 135.512 6.74C134.295 6.74 133.308 7.72676 133.308 8.944C133.308 10.1612 134.295 11.148 135.512 11.148Z" class="cneutral" fill="#394149"></path> </svg></Link>
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
                className='auth-submit-btn font-semibold text-white bg-gradient-to-r mb-6 bg-black py-2 px-10 rounded-full drop-shadow-lg disabled:opacity-75 disabled:cursor-not-allowed' 
                >CREATE ACCOUNT</button>
                <small>Already have an account? <Link className='text-primaryColor hover:underline underline-offset-1 font-bold' to="/login">Log in</Link></small>
            </form>
        </div>
        </>
    )
}