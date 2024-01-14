import React, { useContext, useEffect, useState } from 'react';
import UserEditProfile from './UserEditProfile';
import UserWaitingList from './waitingList'
import MyPosts from './myPosts';
import MyDemandsList from './MyDemandsList';
import MyTravelsList from './myTravelsList';
import { apiService } from '../services/apiService ';
import Cookies from 'js-cookie';
import { AppContext } from '../context/context';
const PersonalArea = () => {
  const { methodAuthData } = apiService()
  const { MyLogUser, setMyLogUser } = useContext(AppContext);
  const [activeComponent, setActiveComponent] = useState(null);
  const [MyPostflag, setMyPostFlag] = useState(false);
  const [MyDemandflag, setMyDemandFlag] = useState(false);
  const [myTravelFlag, setMytravel] = useState(false);
  const [myWaitingList, setmyWaitingList] = useState(false);
  const [myEDITFlag, setmyEDIT] = useState(true);
  const [formatDate,setFormData]=useState()
  useEffect(() => {
   const getMyData = async () => {
    try{
      const response = await methodAuthData('users/myInfo', {}, 'GET');
     let userData = response.data;
      console.log(userData); 
      setFormData(userData);}
      catch(err){
        alert("לצפיה באזור האישי עלייך להתחבר תחילה")
      }
    }
    getMyData()
  },[])


  const logout=()=>{
    Cookies.set('myUserData', null);
    localStorage.setItem('token',null);
    setMyLogUser(null);
  }
  return (
    <div className=' container d-md-block d-lg-flex align-items-start p-0 m-0 '>
      <div style={{ width: "300px", display: 'flex', flexWrap: 'wrap' }} className='myMenu p-0 m-0 '>
        <div className='m-auto'>
        {MyLogUser&&MyLogUser?.image!=""?<img src={MyLogUser?.image} style={{width:"150px",borderRadius:"50%",margin:'auto'}}/>:
        <img  src="images/user.png"style={{ width: "70px",cursor:'pointer', borderRadius: "50%", margin: 'auto' }} />}
        <button className='button-56  m-2' onClick={()=>{logout()}}>התנתקי</button></div>
        <button className=" myMenu shadow-lg mybtn  font-bold py-2 px-4  w-100 mt-2   h-10 " onClick={() => {
          setmyEDIT(!myEDITFlag)
          setmyWaitingList(false)
          setMyPostFlag(false)
          setMyDemandFlag(false)
          setMytravel(false)
        }}>עריכת פרטים אישיים <i className="fa fa-pencil" aria-hidden="true"></i></button>

        <button className="myMenu mybtn shadow-lg font-bold py-2 px-4  w-100 mt-20  h-10" onClick={() => {
          setmyWaitingList(!myWaitingList)
          setmyEDIT(false)
          setMyPostFlag(false)
          setMyDemandFlag(false)
          setMytravel(false)
        }}>
          רשימת ההמתנה שלי <i className="fa fa-list" aria-hidden="true"></i></button>
        <div>

        </div>
        <button className="  myMenu shadow-lg  mybtn  font-bold py-2 px-4 mt-20  w-100  h-10" onClick={() => {
          setMyPostFlag(!MyPostflag)
          setMyDemandFlag(false)
          setmyWaitingList(false)
          setMytravel(false)
          setmyEDIT(false)
        }}>הפוסטים שלי <i class="fa fa-list-alt" aria-hidden="true"></i></button>


        <button className=" myMenu shadow-lg  mybtn  font-bold py-2 px-4  mt-20 w-100  h-10 " onClick={() => {
          setMyDemandFlag(!MyDemandflag)
          setMyPostFlag(false)
          setMytravel(false)
          setmyWaitingList(false)
          setmyEDIT(false)
        }}> הבקשות שלי<i className="fa fa-list" aria-hidden="true"></i></button>


        <button className=" myMenu  shadow-lg   mybtn  font-bold py-2 px-4 mt-20 w-100  h-10" onClick={() => {
          setMytravel(!myTravelFlag)
          setMyDemandFlag(false)
          setMyPostFlag(false)
          setmyWaitingList(false)
          setmyEDIT(false)
        }}> הנסיעות שלי <i class="fa fa-car" aria-hidden="true"></i></button>


      </div>

      <div className='d-md-block  d-lg-flex col-8 justify-content-center align-items-start flex-wrap'>
        {myEDITFlag && <UserEditProfile />}
        {myWaitingList && <UserWaitingList />}
        {MyPostflag && <MyPosts />}
        {MyDemandflag && <MyDemandsList />}
        {myTravelFlag && <MyTravelsList />}
      </div>
    </div>
  );
};

export default PersonalArea;