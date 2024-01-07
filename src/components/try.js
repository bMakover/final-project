// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiService } from '../services/apiService ';
// import Demo from './Demo';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import TypingEffect from './TypingEffect';

// const steps = [
//   {
//     label: 'From where do you want?',
//     input: 'source', // Tag to identify the input type
//   },
//   {
//     label: 'To where do you want?',
//     input: 'destination', // Tag to identify the input type
//   },
// ];

// const Try = () => {
//   const navigate = useNavigate();
//   const { getData,methodAuthData } = apiService();
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [noDrivesFound, setNoDrivesFound] = useState(false);
//   const [catchedDrivesFound, setCatchedDrivesFound] = useState(false);
//   const [undisplayedDrives, setUndisplayedDrives] = useState([]);
//   const [activeStep, setActiveStep] = useState(0);

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

//   const handleStepCompletion = () => {
//     if (activeStep === steps.length - 1) { // Check if it's at the last step
//       findDrives(); // Trigger findDrives function
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     handleStepCompletion(); // Call handleStepCompletion after setting the step
//   };
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const handleInput = (value, inputType) => {
//     const descriptionArray = value.description.split(',');
//     const city = descriptionArray[descriptionArray.length-2]?.trim(); 
//     if (inputType === 'source') {
//       setSource(city);
//     } else if (inputType === 'destination') {
//       setDestination(city);
//     }
//   };
 
//   const findDrives = async () => {
//     try {
//         const response = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=true`);
//         console.log(destination,"ללל")
//         console.log(response);
//         if (response && response.data && response.data.length > 0) {
//           const drivesData = response.data;
//           console.log(drivesData);
//           navigate('/drives', { state: { drivesData, dataType: 'travels' } });
//         } else {
//           setNoDrivesFound(true);
//           const undisplayedResponse = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=false`);
//           if (undisplayedResponse && undisplayedResponse.data && undisplayedResponse.data.length > 0) {
//             console.log('Undisplayed drives found');
//             setCatchedDrivesFound(true);
//             setUndisplayedDrives(undisplayedResponse.data);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error scenarios here
//       }
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
  
//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel>{step.label}</StepLabel>
//             <StepContent>
//               {activeStep === index && (
//                 <>
//                   <TypingEffect text={step.label} /> {/* Show typing effect */}
//                   <Demo onInput={(value) => handleInput(value, step.input)} />
//                   <Box sx={{ mb: 2 }}>
//                     <div>
//                       <Button
//                         variant="contained"
//                         onClick={() => {
//                           handleNext();
//                           handleStepCompletion();
//                         }}
//                         sx={{ mt: 1, mr: 1 }}
//                       >
//                         {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                       </Button>
//                       <Button
//                         disabled={index === 0}
//                         onClick={handleBack}
//                         sx={{ mt: 1, mr: 1 }}
//                       >
//                         Back
//                       </Button>
//                     </div>
//                   </Box>
//                 </>
//               )}
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
         
//           {noDrivesFound &&<><p>No drives found</p>
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
//     <input type="time" id="timePicker" value={selectedTime} onChange={handleTimeChange} />
//     <Button variant="outlined" onClick={saveDemand}>
// שלח לי כשיהיה
//         </Button>
//         </>}
//       </> }
//         </Paper>
//       )}
//       {/* Additional buttons or components based on conditions... */}
//     </Box>
//   );
// };

// export default Try;
