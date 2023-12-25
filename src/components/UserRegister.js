// RegistrationForm.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';


const RegistrationForm = () => {
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
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </label>

      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
      </label>

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
      </label>

      <label>
        Image:
        <input type="text" name="image" onChange={handleImageChange} />
      </label>

      <label>
        Location City:
        <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} />
      </label>

      <label>
        Location Street:
        <input type="text" name="street" value={formData.location.street} onChange={handleLocationChange} />
      </label>

      <label>
        Location House Number:
        <input type="text" name="houseNumber" value={formData.location.houseNumber} onChange={handleLocationChange} />
      </label>

      <label>
        Default Destination City:
        <input type="text" name="city" value={formData.defaultDestination.city} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
        Default Destination Street:
        <input type="text" name="street" value={formData.defaultDestination.street} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
        Default Destination House Number:
        <input type="text" name="houseNumber" value={formData.defaultDestination.houseNumber} onChange={handleDefaultDestinationChange} />
      </label>

      <label>
        Is Driver:
        <input type="checkbox" name="isDriver" checked={formData.isDriver} onChange={handleCheckboxChange} />
      </label>

      {formData.isDriver && (
        <div>
          <label>
            Car Brand:
            <input type="text" name="brand" value={formData.carDescription.brand} onChange={handleCarDescriptionChange} />
          </label>

          <label>
            Car Color:
            <input type="text" name="color" value={formData.carDescription.color} onChange={handleCarDescriptionChange} />
          </label>

          <label>
            Number of Seats:
            <input type="number" name="seatsNumber" value={formData.carDescription.seatsNumber} onChange={handleCarDescriptionChange} />
          </label>

          <label>
            Pick-Up Location:
            <input type="text" name="pickUpLocation" value={formData.pickUpLocation} onChange={handleInputChange} />
          </label>
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
