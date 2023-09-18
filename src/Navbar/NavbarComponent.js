import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './Navbar.scss'
export default function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .get('http://localhost:5001/api/users/current', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserName(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href ='/';
  };

  const handleBrandClick = () => {
    if (isLoggedIn) {
      window.location.href="/UserDashBoard"
    } else {
      window.location.href="/"
    }
  };
  return (
    <>
      <Navbar expand="lg" className="Navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleBrandClick}>Contact Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/userDashBoard">
                  {userName}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
