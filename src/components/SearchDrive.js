import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService ';

const SearchDrive = () => {
  const navigate = useNavigate();
  const { getData } = apiService();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [noDrivesFound, setNoDrivesFound] = useState(false);
  const [catchedDrivesFound, setCatchedDrivesFound] = useState(false);
  const [undisplayedDrives, setUndisplayedDrives] = useState([]);

  const findDrives = async () => {
    try {
      const response = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=true`);
      console.log(response);
      if (response && response.data && response.data.length > 0) {
        const drivesData = response.data;
        console.log(drivesData);
        navigate('/drives', { state: { drivesData, dataType: 'travels' } });
      } else {
        setNoDrivesFound(true);
        const undisplayedResponse = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=false`);
        if (undisplayedResponse && undisplayedResponse.data && undisplayedResponse.data.length > 0) {
          console.log('Undisplayed drives found');
          setCatchedDrivesFound(true);
          setUndisplayedDrives(undisplayedResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error scenarios here
    }
  };

  return (
    <>
      <input placeholder='from where?' onChange={(e) => setSource(e.target.value)} />
      <input placeholder='to where?' onChange={(e) => setDestination(e.target.value)} />
      <button onClick={findDrives}>Search Available Drives</button>
      {noDrivesFound && <p>No drives found</p>}
      {catchedDrivesFound && (
        <button onClick={() => navigate('/drives', { state: { undisplayedDrives, dataType: 'waits' } })}>
          There are closed drives. Want to enter the waiting list?
        </button>
      )}
    </>
  );
};

export default SearchDrive;
