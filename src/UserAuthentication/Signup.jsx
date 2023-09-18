import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (formData.password !== formData.confirm_password) {
            setErrorMessage("Password do not match");
            setIsSubmitting(false);
            return;
        }
        setErrorMessage('');

        // create userData 
        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };


        const apiUrl = 'http://localhost:5001/api/users/register';
        try {
            const response = await axios.post(apiUrl, userData);
            if (response && response.data && response.data._id && response.data.email) {
                setSuccessMessage('Signup sccessfull!');
                setErrorMessage('');
            } else {
                setErrorMessage('Error: Unexpected response from the server');
                setSuccessMessage('');
            }
        }
        catch (error) {
            setErrorMessage(error.response?.data?.message || 'Signup failed');
            setSuccessMessage('');
        }finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="signup-form login-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="form-group user-box">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-group user-box">
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

                <div className="form-group user-box">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-group user-box">
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="confirm_password">Confirm Password</label>
                </div>

                <div class="sk-btn">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: '#9CFF2E' }}>{successMessage}</p>}
        </div>
    );
};

export default Signup;
