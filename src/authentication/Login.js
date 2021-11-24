import React, { useEffect } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { authenticateUser, UserStore } from '../firebase/UserStore';
import { Button } from 'react-bootstrap';
import {useState} from 'pullstate';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    
    const user = UserStore.useState(state => state.user);
    let navigate = useNavigate();
    useEffect(() => {
        if (user.authenticated) {
            navigate('/home')
        }
    }, [user.authenticated])

    return (
        <>
            <h1>Login yo</h1>
            <Button variant='primary' onClick={() => {
                authenticateUser.run();
            }}>Sign In</Button>
        </>
    )
};

export default Login;