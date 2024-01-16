// Login.js
import React, { useContext, useState } from 'react';
import { apiService } from '../services/apiService ';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import Cookies from 'js-cookie';
const Login = () => {
  const { postData,methodAuthData } = apiService();
  const { MyLogUser, setMyLogUser } = useContext(AppContext);
  const [error, setError] = useState()
  const nav=useNavigate()
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
      const res = await methodAuthData('users/myInfo',{},"GET");
      setMyLogUser(res.data)
      console.log('Login successful! Token:', token);
      const myObject = JSON.stringify(res.data );
      Cookies.set('myUserData', myObject);
      alert("התחברת בהצלחה!")
      nav("/SearchDrive")
    } catch (error) {
      console.error('Error logging in:', error);
      alert("עליך להרשם תחילה!")
    }
  };

  return (<div style={{ display: 'flex', justifyContent: 'center', height: '100vh', marginTop: '50px' }}>
  <form className="container mt-2 myform relative shadow-2xl rounded  py-5 pb-5 mb-4 mt-5 h-50" onSubmit={handleSubmit}>
    <div className="circle-container" style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)" }}>
      <img src='images/loginpic.jpg' style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid #000' }} className='shadow' />
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', paddingTop: '32px' }}>
      {/* Your form content */}
      {error}
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label> מייל: </label>
        <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label> סיסמא: </label>
        <input type="password" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" name="password" value={formData.password} onChange={handleInputChange} required />
      </div>

      <div className="container d-flex flex-column align-items-center mt-5">
        <button className="button-56 mx-3 mb-3" type="submit">התחברות</button>
        <Link style={{ textDecoration: 'underline' }} to="/register">עוד לא רשומה?</Link>
      </div>
    </div>
  </form>
</div>
  );
};

export default Login;
