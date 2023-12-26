import React from 'react';
import Drive from './Drive';
import { useLocation } from 'react-router-dom';
const UnAvailableDrives = () => {

    const location = useLocation();
  const drivesData = location.state?.drivesData || []; // Retrieve drivesData from location state
  return (
    <>
      <div>
        <h2>Already Catched Drives:</h2>
        {drivesData.map((drive) => (
          <Drive key={drive._id} drive={drive} />
        ))}
      </div>
    </>
  );
};

export default UnAvailableDrives;

// const addDrives=async(drivesData)=>{
//     const postIds = drivesData.map((drive) => drive._id);

//     // Assuming userId is the ID of the user you want to update
//     const userId = '65833a00467c0a5aa42e575e'; // Replace '123' with the actual user ID

//     // Update the user's travels array by sending a request to the backend
//     const addTravelsResponse = await postData(`users/addTravels/${userId}`, { travels: postIds });
//     console.log(addTravelsResponse.data); // Logging the response from the backend
// }