import React, { useState } from 'react';
import UserEditProfile from './UserEditProfile';
import UserWaitingList from './UserWaitingsList' 

const PersonalArea = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = (component) => {
    switch (component) {
      case 'UserEditProfile':
        return <UserEditProfile />;
        case 'UserWaitingList':
        return <UserWaitingList />;
      // Add more cases for other menu items/components
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Private Area</h2>
      <nav>
        <button onClick={() => setActiveComponent('UserEditProfile')}>Change your Profile</button>    
      </nav>
      <nav>
        <button onClick={() => setActiveComponent('UserWaitingList')}>your waiting List</button>    
      </nav>
      <div>
        {renderComponent(activeComponent)}
      </div>
    </div>
  );
};

export default PersonalArea;