import React, { useEffect } from 'react';
import {UserStore} from '../firebase/UserStore';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = (props) => {

    const user = UserStore.useState(state => state.user);
    return (
        <h1>Home! {user.displayName}</h1>
    )
};

export default Home;