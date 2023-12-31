// RegistrationForm.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';
import { TextField, Checkbox, FormControlLabel, Button, Box } from '@mui/material';

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
      seatsNumber: 0,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: 'auto' }}>
        <TextField label="Full Name" type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <TextField label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
        <TextField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        <TextField label="Image" type="text" name="image" onChange={handleInputChange} />
        <TextField label="Location City" type="text" name="city" value={formData.location.city} onChange={handleLocationChange} />
        {/* Add similar TextField components for other fields */}
        <FormControlLabel
          control={<Checkbox checked={formData.isDriver} onChange={handleCheckboxChange} name="isDriver" />}
          label="Is Driver"
        />
        {formData.isDriver && (
          <div>
            {/* Additional fields for driver */}
            <TextField label="Car Brand" type="text" name="brand" value={formData.carDescription.brand} onChange={handleCarDescriptionChange} />
            <TextField label="seatsNumber" type="text" name="seatsNumber" value={formData.carDescription.seatsNumber} onChange={handleCarDescriptionChange} />
            <TextField label="pickUpLocation" type="text" name="pickUpLocation" value={formData.pickUpLocation} onChange={handleInputChange} />

            {/* Add similar TextField components for other driver-related fields */}
          </div>
        )}
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
