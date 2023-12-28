// SignUp.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';


const SignUp = () => {
  const {postData} = apiService();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    image: '',
    location: {
      city: '',
      street: '',
      houseNumber: '',
    },
    defaultDestination: {
      city: '',
      street: '',
      houseNumber: '',
    },
    isDriver: false,
    carDescription: {
      brand: '',
      color: '',
      seatsNumber: '',
    },
    pickUpLocation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleDefaultDestinationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      defaultDestination: {
        ...prevData.defaultDestination,
        [name]: value,
      },
    }));
  };

  const handleCarDescriptionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      carDescription: {
        ...prevData.carDescription,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await postData("users", formData); // Assuming 'users' is the endpoint you want to hit
        console.log('User registered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields using controlled components */}
      <label>
        שם מלא:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
      </label>

      <label>
        אימייל:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </label>

      <label>
        טלפון:
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
      </label>

      <label>
        סיסמא:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
      </label>

      <label>
        תמונת פרופיל:
        <input type="text" name="image" onChange={handleImageChange} />
      </label>

      <label>
        כתובת-עיר:
        <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} />
      </label>

      <label>
       כתובת -רחוב:
        <input type="text" name="street" value={formData.location.street} onChange={handleLocationChange} />
      </label>

      <label>
        כתובת -מס בית: 
        <input type="text" name="houseNumber" value={formData.location.houseNumber} onChange={handleLocationChange} />
      </label>

      <label>
      עיר יעד ברירת מחדל:
        <input type="text" name="city" value={formData.defaultDestination.city} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
      רחוב יעד ברירת מחדל:
        <input type="text" name="street" value={formData.defaultDestination.street} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
      מספר ברירת המחדל של בית יעד:
        <input type="text" name="houseNumber" value={formData.defaultDestination.houseNumber} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
        האם אתה נהג?
        <input type="checkbox" name="isDriver" checked={formData.isDriver} onChange={handleCheckboxChange} />
      </label>

      {formData.isDriver && (
        <div>
          <label>
            סוג הרכב:
            <input type="text" name="brand" value={formData.carDescription.brand} onChange={handleCarDescriptionChange} />
          </label>

          <label>
           צבע רכב:
            <input type="text" name="color" value={formData.carDescription.color} onChange={handleCarDescriptionChange} />
          </label>

          <label>
            כמות מושבים:
            <input type="number" name="seatsNumber" value={formData.carDescription.seatsNumber} onChange={handleCarDescriptionChange} />
          </label>

          <label>
           נקודת איסוף:
            <input type="text" name="pickUpLocation" value={formData.pickUpLocation} onChange={handleInputChange} />
          </label>
        </div>
      )}

      <button type="submit">הרשמה</button>
    </form>
  );
};

export default SignUp;
