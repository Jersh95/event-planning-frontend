import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from './authentication/Login';
import Home from './components/Home';
import { initializeFirebase } from './firebase/firebase';
import { UserStore, getUser } from './firebase/UserStore';
import Header from './header/Header';
import { Container } from 'react-bootstrap';
import ListView from './components/lists/ListView';
import Logout from './authentication/Logout';

function App() {
  const {initialized, user} = UserStore.useState(state => ({
    initialized: state.initialized,
    user: state.user
  }));

  useEffect(() => {
    if (!initialized) {
      getUser();
    } else if (!user.authenticated) {

    }
  }, [initialized, user]);
  
  // Example request on calling out to the server
  // useEffect(() => {
  // fetch("http://localhost:3001/api")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setData(data.message)
  //   })
  //   .catch(err => {
  //   });

  //   initializeFirebase();
  // }, []);

  return (
    <div className="App">
      <Router>
        <Header/>
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/home' element={<Home />} />
            <Route path='/user/:uid/lists' element={<ListView />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
