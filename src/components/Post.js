import React, { useEffect, useState } from 'react';

import { apiService } from '../services/apiService ';
const Post = ({ drive, dataType }) => {
  const [userId, setUserId] = useState('');
  const { methodAuthData,postData } = apiService();

 // Removed the dependency array to resolve the exhaustive-deps warning
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await methodAuthData('users/myInfo', {}, 'GET');
      console.log(response,"!!!")
      setUserId(response.data._id);
    } catch (error) {
      alert("פג תוקף התחברותך התחברי שוב")
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
    <div>
      מקור הנסיעה: {drive.source.city}, יעד הנסיעה: {drive.destination.city}, Driver ID: {drive.idDriver}
      {dataType === 'travels' ? (
        <button onClick={() => updateUserArray('join')}>הצטרף לנסיעה זו</button>
      ) : (
        <button onClick={() => updateUserArray('wait')}>הכנס לרשימת המתנה של נסיעה זו</button>
      )}
    </div>
  );
};

export default Post;