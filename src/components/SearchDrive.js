import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService ';
import Demo from './Demo';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TypingEffect from './TypingEffect';
import { ChakraProvider, theme } from '@chakra-ui/react'
import RouteMap from './RouteMap';


// const GOOGLE_MAPS_API_KEY = 'AIzaSyA7ekcgt6U0BOxTJgmYtxBn6Xqrz2AklYc';




const steps = [
  {
    label: 'מאיפה את רוצה לצאת?',
    input: 'source', // Tag to identify the input type
  },
  {
    label: 'לאן את רוצה להגיע?',
    input: 'destination', // Tag to identify the input type
  },
];

const SearchDrive = () => {
  const navigate = useNavigate();
  const { getData, methodAuthData } = apiService();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [noDrivesFound, setNoDrivesFound] = useState(false);
  const [catchedDrivesFound, setCatchedDrivesFound] = useState(false);
  const [undisplayedDrives, setUndisplayedDrives] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const [userId, setUserId] = useState('');
  const [showSelectDate, setShowSelectDate] = useState(false)
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('')



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleStepCompletion = () => {
    if (activeStep === steps.length - 1) { // Check if it's at the last step
      findDrives(); // Trigger findDrives function
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleStepCompletion(); // Call handleStepCompletion after setting the step
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleInput = (value, inputType) => {
    const descriptionArray = value?.description.split(',');
    if(descriptionArray!=undefined)
    {
    const city = descriptionArray[descriptionArray.length - 2]?.trim();
    if (inputType === 'source') {
      setSource(city);
    } else if (inputType === 'destination') {
      setDestination(city);
    }
  }
  };

  const ArrFull = async (arr) => {
    const userResponse = await methodAuthData('users/myInfo', {}, 'GET');
    const userDriverId = userResponse.data._id;
    console.log(userDriverId)
    const drivesData = arr.filter(drive =>{return(drive.idDriver !=userDriverId)});
    console.log(drivesData)
    return drivesData
  }

  const findDrives = async () => {
    try {
      const response = await getData(`posts/getPostsByDesNSrc/${source}/${destination}?isdisplay=true`);
      console.log(response.data, "ללל")
      response.data =await ArrFull(response.data)
      console.log(response.data);
      if (response?.data?.length>0) {
        const drivesData = response.data
        navigate('/drives', { state: { drivesData, dataType: 'travels' } });
      }
      else {
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


  const saveDemand = async () => {
    try {

      const response = await methodAuthData('users/myInfo', {}, 'GET');
      console.log(response, "!!!")
      setUserId(response.data._id);
      const obj = {
        idUser: response.data._id,
        source: {
          city: source,
        },
        destination: {
          city: destination,
        },
        limitDate: selectedDate, // Use the selected date here
      };

      const data = await methodAuthData(`demands/`, obj, "POST");
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error scenarios here
    }
  };

  return (
    <div className='container-fluid text-center d-flex justify-contant-center my-3' style={{ height: "" }}>
      <Box className='shadow p-3 text-center' sx={{ maxWidth: 600 }}>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ direction: 'rtl' }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {activeStep === index && (
                  <>
                    <TypingEffect text={step.label} /> {/* Show typing effect */}
                    <Demo className="w-50" onInput={(value) => handleInput(value, step.input)} />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button className="button-56" style={{ backgroundColor: "#fee6e3" }}
                          variant="contained"
                          onClick={() => {
                            handleNext();
                            handleStepCompletion();
                          }}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'חפשי' : 'המשיכי'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          חזור
                        </Button>
                      </div>
                    </Box>
                  </>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>

            {noDrivesFound && <><p>לא נמצאו נסיעות </p>
              {catchedDrivesFound && (
                <Button className='button-56' variant="outlined" onClick={() => navigate('/drives', { state: { undisplayedDrives, dataType: 'waits' } })}>
                  ישנה נסיעה קרובה רוצה להכניסה לרשימת המתנה?
                </Button>
              )}
              <Button className='button-56' style={{ color: "pink", border: "2px solid pink" }} variant="outlined" onClick={() => setShowSelectDate(true)}>
                רוצה לשמור בקשה
              </Button>
              {showSelectDate && <> <label htmlFor="datePicker">בחר תאריך:</label>
                <input className='form-control m-2' type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />
                <label htmlFor="timePicker"> בחרי זמן:</label>
                <input className='form-control m-2' type="time" id="timePicker" value={selectedTime} onChange={handleTimeChange} />
                <Button className='button-56' style={{ color: "pink", border: "2px solid pink" }} variant="outlined" onClick={saveDemand}>
                  שלח לי כשיהיה
                </Button>
              </>}
            </>}
          </Paper>
        )}
        {/* Additional buttons or components based on conditions... */}
      </Box>
      <div className='container-fluid'>
        {source && destination ? (
          <ChakraProvider theme={theme}>
            <RouteMap source={source} destination={destination} />
          </ChakraProvider>
        ) : (
          <img src='images/back.jpg' alt='Alternative Text' style={{ width: '100%', height: '100%' }} />
        )}
      </div>

    </div>
  );
};

export default SearchDrive;