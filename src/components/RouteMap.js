import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

function RouteMap(place) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });


  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [source, setSource] = useState('בני ברק');
  const [destination, setDestination] = useState('ירושלים');

  useEffect(() => {
   setDestination(place.destination)
   setSource(place.source)
},)
  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    
    if (source === '' || destination === '') {
      return;
    }
    console.log(place.source);
    console.log(place.destination);
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: source,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setSource('');
    setDestination('');
  }

  return (
    <div className='container'>
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='660px'
      w='100%'

    >
      <Box position='left' left={1} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap 
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '80%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box 
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
           
              <Input
                type='text'
                placeholder='Origin'
                value={place.source}
                onLoad={e => setSource(e.target.value)}
              />
          </Box>
          <Box flexGrow={1}>   
              <Input
                type='text'
                placeholder='Destination'
                value={place.destination}
                onLoad={e => setDestination(e.target.value)}
              />
        
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
             חישוב מסלול
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>מרחק- {distance} </Text>
          <Text>זמן נסיעה- {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex></div>
  );
}

export default RouteMap;