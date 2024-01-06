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
              alert("פג תוקף התחברותך התחברי שוב")
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
        alert("פג תוקף התחברותך התחברי שוב")
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
    <div className='container d-flex d-flex-wrap align-items-start'>
      <h2> רשימת המתנה:</h2>
      <ul>
        {waitingList.map((post) => (
          <li className='border m-2 w-80' key={post._id}>
            <p><strong>כתובת מקור:</strong></p>
            <p>
              {post.source.city}, {post.source.street}, {post.source.houseNumber} </p>
            <br />
            <p><strong>כתובת יעד:</strong></p>
            <p> {post.destination.city}, {post.destination.street}, {post.destination.houseNumber}</p>

            <button className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => handleWaitClick(post)}>
              {selectedWait === post ? 'הסתר פרטים' : 'הראה פרטים'}
            </button>
            {selectedWait === post && (
              <div>
                <p><strong>פרטים:</strong></p>
                <p> {post.description}</p>
                <p><strong>זמן יציאה:</strong></p>
                <p>{new Date(post.departure.date).toLocaleDateString()}, {post.departure.hour}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserWaitingList;