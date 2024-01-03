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
    {/* <h2 style={{margin:'auto',color:'red'}}>התחברות</h2> */}
    <form className=" myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
      <img src='images/login.jpg' style={{ width: '85%', height: "200px" ,borderRadius:'20px'}} />
      {error}
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label> מייל: </label>
        <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="email" name="email" value={formData.email} onChange={handleInputChange} required />

      </div>
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label> סיסמא: </label>
        <input type="password" className=" myFiled appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="password" value={formData.password} onChange={handleInputChange} required />

      </div>
      <div className="container">
        <button className="mybtn  m-3 text-white font-bold py-2 px-4 rounded-full" type="submit">התחברות</button>
        <Link className='m-3 text-light' to="/register">עוד לא רשומה?</Link></div></div>
    </form>


  </>
  );
};

export default Login;
