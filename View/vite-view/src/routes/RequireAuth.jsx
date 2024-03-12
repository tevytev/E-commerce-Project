import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const AUTOLOGIN_URL = '/api/users/autologin';

export default function  RequireAuth ({user}) {


    const { auth, setAuth } = useAuth();
    const location = useLocation();

    // useEffect(() => {
    //     if (user) {
    //         setAuth({user});
    //     };

    //     return () => {

    //     }
    // }, [user])

    return (
        auth?.user
            ? <Outlet />
            : <Outlet />
    )
}