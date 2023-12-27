import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService ';
import Demo from './Demo'
const SearchDrive = () => {
  const navigate = useNavigate();
  const { getData } = apiService();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [noDrivesFound, setNoDrivesFound] = useState(false);
  const [catchedDrivesFound, setCatchedDrivesFound] = useState(false);
  const [undisplayedDrives, setUndisplayedDrives] = useState([]);


  const handleSourceSelect = (value) => {
    if (value && value.description) {
      const city = value.description.split(',')[1].trim(); // Extract the city name
      setSource(city);
    }
  };
  
  const handleDestinationSelect = (value) => {
    if (value && value.description) {
      const city = value.description.split(',')[1].trim(); // Extract the city name
      setDestination(city);
    }
  };
  const findDrives = async () => {
    try {
      const response = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=true`);
      console.log(destination,"ללל")
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
      {/* Render the GoogleMaps component for source */}
      <Demo onInput={handleSourceSelect}/>
      {/* Render the GoogleMaps component for destination */}
      <Demo onInput={handleDestinationSelect} />
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
