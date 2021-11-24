import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {logoutUser} from '../firebase/UserStore';

export const Logout = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        logoutUser.run();
        navigate('/');
    }, []);

    return null;
};

export default Logout;