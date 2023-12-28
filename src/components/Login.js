// Login.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';

const Login = () => {
  const { postData } = apiService();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await postData('users/login', formData); // Assuming 'login' is the login endpoint
      console.log('Login response:', response ? response.data : 'Response is undefined');
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful! Token:', token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        הכנס מייל:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </label>

      <label>
        הכנס סיסמא:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;