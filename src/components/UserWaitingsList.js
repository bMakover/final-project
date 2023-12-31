import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService ';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Collapse,
  Divider,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function UserWaitingList() {
  const { methodAuthData } = apiService();
  const [waitingList, setWaitingList] = useState([]);
  const [selectedWait, setSelectedWait] = useState(null);

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await methodAuthData('users/myInfo', {}, 'GET');
        const userData = response.data;

        if (userData.waits && userData.waits.length > 0) {
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
    setSelectedWait(selectedWait === wait ? null : wait);
  };

  const cardStyles = {
    width: '100%',
    maxWidth: 500,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
  };

  const buttonStyles = {
    alignSelf: 'flex-start',
    marginTop: 8,
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" marginTop={2}>
      <Typography variant="h4" gutterBottom>
        Waiting List
      </Typography>
      {waitingList.map((post) => (
        <Card key={post._id} style={cardStyles}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 16 }}>
            <Typography variant="body1">
              Source: {post.source.city}, {post.source.street}, {post.source.houseNumber}
              <br />
              Destination: {post.destination.city}, {post.destination.street}, {post.destination.houseNumber}
            </Typography>
            <Button
              style={buttonStyles}
              onClick={() => handleWaitClick(post)}
              variant="contained"
              color="primary"
            >
              {selectedWait === post ? 'Hide Details' : 'Show Details'}
            </Button>
            <Collapse in={selectedWait === post} timeout="auto" unmountOnExit>
              <Box marginTop={1}>
                <Typography>Description: {post.description}</Typography>
                <Typography>
                  Departure: {new Date(post.departure.date).toLocaleDateString()}, {post.departure.hour}
                </Typography>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserWaitingList;
