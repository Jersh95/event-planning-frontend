import React, { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { UserStore, getUser } from '../firebase/UserStore';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import { Image } from 'react-bootstrap';

const Header = (props) => {

    const { initialized, user } = UserStore.useState(state => ({
        initialized: state.initialized,
        user: state.user
    }));

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link to='/home'>
                        <Image src={user.photoURL} roundedCircle />
                    </Link>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={`/user/${user.uid}/lists`}>Lists</Link>
                        {/* <Link to='/home'>Home</Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )


};

export default Header;