// Login.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';
import { Link } from 'react-router-dom';

const Login = () => {
  const { postData } = apiService();
  const [error, setError] = useState()
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
    if (formData.password.length < 6) {
      setError("סיסמא חייבת להכיל לפחות 6 תווים")
      return
    }
    try {
      console.log(formData)
      const response = await postData('users/login', formData); // Assuming 'login' is the login endpoint
      console.log('Login response:', response ? response.data : 'Response is undefined');
      const { token } = response.data;
      localStorage.setItem('token', token);

      console.log('Login successful! Token:', token);
      alert("התחברת בהצלחה!")
    } catch (error) {
      console.error('Error logging in:', error);
      alert("עליך להרשם תחילה!")
    }
  };

  return (<>
    <form onSubmit={handleSubmit}>
      {error}
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
    <Link className='m-3  text-light' to="/register">עוד לא רשומה?</Link>
    
    </>
  );
};

export default Login;
