import React, { useState } from 'react';
import Demo from './Demo'; // Import the GoogleMaps component

function PreDemo() {
  const [inputFromChild, setInputFromChild] = useState('');

  // Define a callback function to receive input value from child
  const handleInputFromChild = (inputValue) => {
    setInputFromChild(inputValue);
    // Now you can use inputValue in your parent component as needed
  };

  return (
    <div>
      {/* Render the GoogleMaps component and pass the callback function */}
      <Demo onInput={handleInputFromChild} />
      {/* Display the input value obtained from the child component */}
      <p>Input value from child: {inputFromChild}</p>
    </div>
  );
}

export default PreDemo;
