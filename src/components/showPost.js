import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService ';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
} from '@mui/material';

const ShowPost = (props) => {
  const item = props.item;
  const [flag, setFlag] = useState(false);
  const [driverDetails, setDriverDetails] = useState();
  const { getData } = apiService();

  useEffect(() => {
    const getMyInfo = async () => {
      const id = item.idDriver;
      const user = await getData(`users/${id}`);
      const driver = user.data;
      setDriverDetails(driver);
    };
    getMyInfo();
  }, []);

  return (
    <>
      <div>
        <Button onClick={() => setFlag(!flag)} variant="contained" color="primary">
          {flag ? 'Hide Post' : 'View Post'}
        </Button>
      </div>
      {flag && (
        <Card variant="outlined" sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Driver Information</Typography>
            <Divider />
            <Box mt={2}>
              <Typography>Driver Name: {driverDetails?.fullName}</Typography>
              <Typography>Contact Details:</Typography>
              <Typography>Email: {driverDetails?.email}</Typography>
              <Typography>Phone: {driverDetails?.phone}</Typography>
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Ride Details
            </Typography>
            <Divider />
            <Box mt={2}>
              <Typography>Source Location:</Typography>
              <Typography>City: {item.source.city}</Typography>
              {item.source.street && <Typography>Street: {item.source.street}</Typography>}
              {item.source.houseNumber && (
                <Typography>House Number: {item.source.houseNumber}</Typography>
              )}
              <Typography>Destination Location:</Typography>
              <Typography>City: {item.destination.city}</Typography>
              {item.destination.street && <Typography>Street: {item.destination.street}</Typography>}
              {item.destination.houseNumber && (
                <Typography>House Number: {item.destination.houseNumber}</Typography>
              )}
              <Typography>Description:</Typography>
              <Typography>{item.description}</Typography>
              <Typography>Seats Count: {item.seatsCount}</Typography>
              <Typography>Departure Date: {item.createDate}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ShowPost;
