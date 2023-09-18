import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashBoard.scss'
import { Container,Row,Col, Button} from 'react-bootstrap';
import ContactTable from '../Contact/ContactTable';
import CreateContact from '../Contact/CreateContact';
import { Link } from 'react-router-dom';
const UserDashBoard = () => {
    const [userName, setUserName] = useState('');
    const [contacts, setContacts]=useState([]);
    // for create contact
    const [showCreateContact, setShowCreateContact] = useState(false);


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
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/contacts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
  
        setContacts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Function to open the create contact popup
    const handleOpenCreateContact = ()=>{
      setShowCreateContact(true);
    }

    // Function to close the create contact popup
    const handleCloseCreateContact = () => {
      setShowCreateContact(false);
    }


  return (
    <>
      <Row>
        <Col className='col-md-3 col-12'></Col>
        <Col className='col-md-6 col-12'><h1>Welcome {userName}!</h1></Col>
        <Col className='col-md-3 col-12 create-contact-button'>
        <button onClick={handleOpenCreateContact}>Create Contact</button>
        {showCreateContact && (
              <div className="popup">
                <CreateContact onClose={handleCloseCreateContact}/>
              </div>
          )}
        </Col>
      </Row>
      <Container className='mt-5'>
        <div className='dashboard-box'>
              <ContactTable contacts={contacts}/>
        </div>
      </Container>
    </>
  );
};

export default UserDashBoard;
