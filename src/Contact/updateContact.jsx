import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import './updateContact.scss'

export default function UpdateContact({contact,onClose,id}) {
    const accessToken = localStorage.getItem('accessToken');
    const [formData, setFormData] = useState({
        username:contact.name || '',
        email:contact.email || '',
        phone_number:contact.phone || '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const userData = {
            name: formData.username,
            email: formData.email,
            phone: formData.phone_number,
        };
        const apiUrl = `http://localhost:5001/api/contacts/${id}`;
        try {
            const response = await axios.put(apiUrl, userData,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            setSuccessMessage('Contact Updated Successfully');
            setErrorMessage('');
            window.location.href = "/UserDashBoard";

        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Something is wrong!');
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <>
            <div className="login-box sk-update-contact shadow-sm">
                <form action="" onSubmit={handleSubmit} autoComplete="off">
                    <div className="update-contact-box">
                        <button onClick={onClose} className="close-btn">
                            X
                        </button>
                    </div>
                    <h1 className='update-contact-heading'>Update Contact!</h1>
                    <div className="user-box">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Name</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="user-box">
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            minLength={10}
                            maxLength={10}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Phone Number</label>
                    </div>

                    <div className="sk-btn">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </>
    )
}
