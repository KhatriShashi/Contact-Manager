import React from 'react';
import { Link } from 'react-router-dom';
import { Table} from 'react-bootstrap';
import { PencilFill, Trash } from 'react-bootstrap-icons';
import './ContactTable.scss'
import { useState } from 'react';
import UpdateContact from './updateContact';
import DeleteContact from './DeleteContact';


const ContactTable = ({ contacts }) => {
  const [showUpdateContact, setShowUpdateContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedContactId, setSelectedContactId] = useState('');
  const handleOpenUpdateContact = (contact) => {
    setSelectedContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
    setSelectedContactId(contact._id);
    setShowUpdateContact(true);
  }
  const handleCloseUpdateContact = () => {
    setSelectedContact({
      name: '',
      email: '',
      phone: ''
    });
    setSelectedContactId('');
    setShowUpdateContact(false);
  }

  // Delete Contact
  const [confirmModalShow,setConfirmModalShow]= useState(false);
  const handleOpenDeleteContact = () =>{
    setConfirmModalShow(true);
  }

  const handleCloseDeleteContact = () =>{
    setConfirmModalShow(false);
  }

  return (
    <>
      <Table bordered className="contact-table">
        <thead>
          <tr>
            <th className='text-center'>Name</th>
            <th className='text-center'>Email</th>
            <th className='text-center'>Phone</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className='text-center'>{contact.name}</td>
              <td className='text-center'>{contact.email}</td>
              <td className='text-center'>{contact.phone}</td>
              <td className='contact-action'>
                <PencilFill
                  className='edit-contact'
                  onClick={() => handleOpenUpdateContact(contact)}
                />
                {showUpdateContact && selectedContact && (
                  <div className='popup'>
                    <UpdateContact contact={selectedContact} id={selectedContactId} onClose={handleCloseUpdateContact} />
                  </div>
                )}

                {/* Delete Contact */}
                <Trash className='delete-contact' onClick={()=>handleOpenDeleteContact()}/>
                {confirmModalShow && (
                  <div>
                    <DeleteContact onClose={handleCloseDeleteContact}/>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ContactTable;
