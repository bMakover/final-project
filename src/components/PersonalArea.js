import React, { useState } from 'react';
import UserEditProfile from './UserEditProfile';
import UserWaitingList from './waitingList'
import MyPosts from './myPosts';
import MyDemandsList from './MyDemandsList';
import MyTravelsList from './myTravelsList';

const PersonalArea = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [MyPostflag, setMyPostFlag] = useState(false);
  const [MyDemandflag, setMyDemandFlag] = useState(false);
  const [myTravelFlag, setMytravel] = useState(false);

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
      <h2>אזור אישי</h2>
      <nav>
        <button className="mybtn text-white font-bold py-2 px-4 rounded-full m-3" onClick={() => setActiveComponent('UserEditProfile')}> עידכון פרטים אישיים <i className="fa fa-pencil" aria-hidden="true"></i></button>
      </nav>
      <nav>
        <button className="mybtn text-white font-bold py-2 px-4 rounded-full m-3" onClick={() => setActiveComponent('UserWaitingList')}>רשימת ההמתנה שלי  <i className="fa fa-list" aria-hidden="true"></i></button>
      </nav>
      <div>
        {renderComponent(activeComponent)}
      </div>
      <button className="d-block mybtn text-white font-bold py-2 px-4 rounded-full m-3" onClick={() => {
        setMyPostFlag(!MyPostflag)
        setMyDemandFlag(false)
        setMytravel(false)
      }}>הפוסטים שלי <i class="fa fa-list-alt" aria-hidden="true"></i></button>
      {MyPostflag && <MyPosts />}

      <button className=" d-block mybtn text-white font-bold py-2 px-4 rounded-full m-3" onClick={() => {
        setMyDemandFlag(!MyDemandflag)
        setMyPostFlag(false)
        setMytravel(false)
      }}> הבקשות שלי<i className="fa fa-list" aria-hidden="true"></i></button>
      {MyDemandflag && <MyDemandsList />}

      <button className=" d-block mybtn text-white font-bold py-2 px-4 rounded-full m-3" onClick={() => {
        setMytravel(!myTravelFlag)
        setMyDemandFlag(false)
        setMyPostFlag(false)
      }}> הנסיעות שלי <i class="fa fa-car" aria-hidden="true"></i></button>
      {myTravelFlag && <MyTravelsList />}

    </div>
  );
};

export default PersonalArea;