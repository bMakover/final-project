// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiService } from '../services/apiService ';
// import Demo from './Demo'
// import Button from '@mui/material/Button';
// import TypingEffect from './TypingEffect';
// import { TypeAnimation } from 'react-type-animation';
// const SearchDrive = () => {
//   const navigate = useNavigate();
//   const { getData,methodAuthData } = apiService();
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [noDrivesFound, setNoDrivesFound] = useState(false);
//   const [catchedDrivesFound, setCatchedDrivesFound] = useState(false);
//   const [undisplayedDrives, setUndisplayedDrives] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [showSelectDate, setShowSelectDate] = useState(false)
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('')



//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };
  
//   const handleTimeChange = (event) => {
//     setSelectedTime(event.target.value);
//   };
//   const handleSourceSelect = (value) => {
//     if (value && value.description) {
//       const descriptionArray = value.description.split(',');
//       const city = descriptionArray[descriptionArray.length-2]?.trim(); // Extract the city name
//       if (city) {
//         setSource(city);
//       }
//     }
//   };
  
//   const handleDestinationSelect = (value) => {
//     if (value && value.description) {
//       const descriptionArray = value.description.split(',');
//       const city = descriptionArray[descriptionArray.length-2]?.trim(); // Extract the city name
//       if (city) {
//         setDestination(city);
//       }
//     }
//   };
//   const saveDemand = async () => {
//     try {
      
//       const response = await methodAuthData('users/myInfo', {}, 'GET');
//       console.log(response, "!!!")
//       setUserId(response.data._id);
//       const obj = {
//         idUser: response.data._id,
//         source: {
//           city: source,
//         },
//         destination: {
//           city: destination,
//         },
//         limitDate: selectedDate, // Use the selected date here
//       };
  
//       const data = await methodAuthData(`demands/`, obj, "POST");
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error scenarios here
//     }
//   };
  
//   const findDrives = async () => {
//     try {
//       const response = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=true`);
//       console.log(destination,"ללל")
//       console.log(response);
//       if (response && response.data && response.data.length > 0) {
//         const drivesData = response.data;
//         console.log(drivesData);
//         navigate('/drives', { state: { drivesData, dataType: 'travels' } });
//       } else {
//         setNoDrivesFound(true);
//         const undisplayedResponse = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=false`);
//         if (undisplayedResponse && undisplayedResponse.data && undisplayedResponse.data.length > 0) {
//           console.log('Undisplayed drives found');
//           setCatchedDrivesFound(true);
//           setUndisplayedDrives(undisplayedResponse.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error scenarios here
//     }
//   };

//   return (
//     <>
// <TypingEffect /> 
//       {/* Render the GoogleMaps component for source */}
//       <Demo onInput={handleSourceSelect}/>
//       {/* Render the GoogleMaps component for destination */}

//       <Demo onInput={handleDestinationSelect} />
//       <Button variant="outlined" onClick={findDrives}>Search Available Drives</Button>
//       {noDrivesFound &&<><p>No drives found</p>
//       {catchedDrivesFound && (
//         <Button variant="outlined" onClick={() => navigate('/drives', { state: { undisplayedDrives, dataType: 'waits' } })}>
//           There are closed drives. Want to enter the waiting list?
//         </Button>
//       )}
//    <Button variant="outlined" onClick={() => setShowSelectDate(true)}>
//                   רוצה לשמור בקשה
// </Button>
//    {showSelectDate &&<> <label htmlFor="datePicker">Select Date:</label>
//     <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />

//     <label htmlFor="timePicker">Select Time:</label>
//     <input type="time" id="timePicker" value={selectedTime} onChange={handleTimeChange} /></>}
//     <Button variant="outlined" onClick={saveDemand}>
// שלח לי כשיהיה
//         </Button>
//       </> }
      
//     </>
//   );
// };

// export default SearchDrive;