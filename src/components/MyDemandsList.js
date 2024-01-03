
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService ';

const MyDemandsList = () => {
  const { methodAuthData } = apiService();
  const [myDemands, setMyDemands] = useState([]);

  useEffect(() => {
    fetchMyDemands();
  }, []);

  const fetchMyDemands = async () => {
    try {
      const response = await methodAuthData('demands/getMyDemand', {}, 'GET');
      // Filter demands with limitDate before today's date
      const filteredDemands = response.data.filter(
        (demand) => new Date(demand.limitDate) < new Date()
      );
      setMyDemands(filteredDemands);
    } catch (error) {
      console.error('Error fetching demands:', error);
    }
  };

  const handleDeleteDemand = async (demandId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this demand?');
    if (confirmDelete) {
      try {
        // Send a request to delete the demand
        await methodAuthData(`demands/${demandId}`, {}, 'DELETE');
        // After successful deletion, fetch the updated list of demands
        fetchMyDemands();
      } catch (error) {
        console.error('Error deleting demand:', error);
      }
    }
  };

  return (
    <div>
      <h2>רשימת הבקשות שלי:</h2>
      <ul>
        {myDemands.map((demand) => (
          <li key={demand._id}>
            <strong>כתובת מקור :</strong> {demand.source.city}, {demand.source.street}, {demand.source.houseNumber}<br />
            <strong>כתובת יעד:</strong> {demand.destination.city}, {demand.destination.street}, {demand.destination.houseNumber}<br />
            <strong>תאריך אחרון למימוש הבקשה :</strong> {new Date(demand.limitDate).toLocaleDateString()}<br />
            {/* Add other demand details as needed */}
            <button onClick={() => handleDeleteDemand(demand._id)}>מחק בקשה זו</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyDemandsList;