import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService ';

function UserWaitingList() {
  const { methodAuthData } = apiService();
  const [waitingList, setWaitingList] = useState([]);
  const [selectedWait, setSelectedWait] = useState(null);

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        // Fetch user data with waits array
        const response = await methodAuthData('users/myInfo', {}, 'GET');
        const userData = response.data;

        if (userData.waits && userData.waits.length > 0) {
          // Fetch posts for each ID in the waits array
          const postsPromises = userData.waits.map(async (postId) => {
            try {
              const postResponse = await methodAuthData(`posts/${postId}`, {}, 'GET');
              return postResponse.data;
            } catch (error) {
              console.error('Error fetching post:', error);
              return null;
            }
          });
          const postsData = await Promise.all(postsPromises);

          setWaitingList(postsData);
        } else {
          setWaitingList([]);
        }
      } catch (error) {
        console.error('Error fetching waiting list:', error);
      }
    };

    fetchWaitingList();
  }, []);

  const handleWaitClick = (wait) => {
    // Toggle selectedWait state
    setSelectedWait(selectedWait === wait ? null : wait);
  };

  return (
    <div>
      <h2>Waiting List</h2>
      <ul>
        {waitingList.map((post) => (
          <li key={post._id}>
            <p>
              Source: {post.source.city}, {post.source.street}, {post.source.houseNumber}
              <br />
              Destination: {post.destination.city}, {post.destination.street}, {post.destination.houseNumber}
            </p>
            <button onClick={() => handleWaitClick(post)}>
              {selectedWait === post ? 'Hide Details' : 'Show Details'}
            </button>
            {selectedWait === post && (
              <div>
                <p>Description: {post.description}</p>
                <p>Departure: {new Date(post.departure.date).toLocaleDateString()}, {post.departure.hour}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserWaitingList;
