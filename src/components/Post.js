import React, { useEffect, useState } from 'react';

import { apiService } from '../services/apiService ';
const Post = ({ drive, dataType }) => {
  const [userId, setUserId] = useState('');
  const { methodAuthData, postData } = apiService();
  const [driver, setDeriver] = useState('');
  // Removed the dependency array to resolve the exhaustive-deps warning
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await methodAuthData('users/myInfo', {}, 'GET');
        console.log(response, "!!!")
        setUserId(response.data._id);

        const resDRIVER = await methodAuthData(`users/${drive.idDriver}`, {}, 'GET');
        setDeriver(resDRIVER.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error scenarios here
      }
    };

    fetchData(); // Immediately invoke the async function
  }, []);
  const updateUserArray = async (actionType) => {
    try {


      let endpoint = '';
      if (dataType === 'travels' && actionType === 'join') {
        endpoint = `posts/addTravel/${userId}/${drive._id}`;
      } else if (dataType === 'waits' && actionType === 'wait') {
        endpoint = `posts/addWait/${userId}/${drive._id}`;
      }

      if (endpoint) {
        // Your postData function goes here...
        const response = await postData(endpoint);
        console.log('Making API call:', endpoint);
      }
    } catch (error) {
      console.error('Error updating user array:', error);
      // Handle error scenarios here
    }
  };

  return (
    <div className='container mb-20 myform'>
      <p><strong>
        מקור: {drive.source.city}</strong></p>
      <p><strong>
        יעד: {drive.destination.city}</strong></p>
      <p><strong>
        שם נהגת: {driver.fullName}</strong></p>
      <p><strong>
        אימייל נהגת: {driver.email}</strong></p>
      <p><strong>
        טלפון נהגת: {driver.phone}</strong></p>
      {dataType === 'travels' ? (
        <button className='button-56' onClick={() => updateUserArray('join')}>הצטרף לנסיעה זו</button>
      ) : (
        <button className='button-56' onClick={() => updateUserArray('wait')}>המתן לנסעיה זו</button>
      )}
              <img src='images/littelcar.png' style={{width:"200px",height:"100px"}}/>
    </div>
  );
};

export default Post;