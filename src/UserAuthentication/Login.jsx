import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';
export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Function to handle form data change and set it in state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // create userData to be sent
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    const apiUrl = 'http://localhost:5001/api/users/login';
    try {
      const response = await axios.post(apiUrl, userData);
      if (response && response.data && response.data.accessToken) {

        localStorage.setItem('accessToken', response.data.accessToken);
        setSuccessMessage('Login successful!');
        setErrorMessage('');

        // store the accessToken to localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        // redirect to dashboard
        window.location.href ='/UserDashBoard';
      } else {
        setErrorMessage('Error: Unexpected response from the server');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit} autoComplete="off">
          <div className="user-box">
            <input
              type="email"
              id="login_email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="user-box">
            <input
              type="password"
              id="login_password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="sk-btn">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: '#9CFF2E' }}>{successMessage}</p>}
      </div>
    </>
  );
}
