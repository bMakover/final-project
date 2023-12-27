import React from 'react';
import { apiService } from '../services/apiService ';

const Post = ({ drive, dataType }) => {
  const { postData } = apiService();

  const updateUserArray = async (actionType) => {
    try {
      const userId = '65833a00467c0a5aa42e575e'; // Replace this with the actual user ID

      let endpoint = '';
      if (dataType === 'travels' && actionType === 'join') {
        endpoint = `posts/addTravel/${userId}/${drive._id}`;
      } else if (dataType === 'waits' && actionType === 'wait') {
        endpoint = `posts/addWait/${userId}/${drive._id}`;
      }

      if (endpoint) {
        const response = await postData(endpoint);
        console.log(response); // Logging the response from the backend
      }
    } catch (error) {
      console.error('Error updating user array:', error);
      // Handle error scenarios here
    }
  };

  return (
    <div>
      Source: {drive.source.city}, Destination: {drive.destination.city}, Driver ID: {drive.idDriver}
      {dataType === 'travels' ? (
        <button onClick={() => updateUserArray('join')}>Join this drive</button>
      ) : (
        <button onClick={() => updateUserArray('wait')}>Wait for this drive</button>
      )}
    </div>
  );
};

export default Post;
