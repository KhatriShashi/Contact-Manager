import React from 'react'
import Login from './UserAuthentication/Login';
import Signup from './UserAuthentication/Signup';
import Home from './Home/Home';
import UserDashBoard from './Home/UserDashBoard';
import NavbarComponent from './Navbar/NavbarComponent';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import CreateContact from './Contact/CreateContact';
import UpdateContact from './Contact/updateContact';
import './Global.scss'
export default function App() {
  return (
    <>
     <Router>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/UserDashBoard" element={<UserDashBoard/>}/>
        <Route path="/create-contact" element={<CreateContact/>}/>
        <Route path="/update-contact/:contactId" element={<UpdateContact/>} />
      </Routes>
    </Router>
    </>
  )
}
