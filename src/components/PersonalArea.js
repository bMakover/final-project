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
      <div style={{ width: "350px", display: 'flex', flexWrap: 'wrap' }} className='myMenu p-0 m-0 shadow border border-light my-5 px-3 py-4'>
        {formatDate&&formatDate?.image!=null?<img className='shadow-lg' src={formatDate?.image} style={{width:"120px",height:"120px",borderRadius:"50%",margin:'auto', marginBottom:"24px"}}/>:
        <img  className='shadow-lg' src="images/user.png"style={{ width: "120px",cursor:'pointer', borderRadius: "50%", margin: 'auto' }} />}
        
        <button className=" myMenu shadow-lg mybtn m-2  font-bold py-2 px-4  w-100 mt-2   h-10 " onClick={() => {
          setmyEDIT(!myEDITFlag)
          setmyWaitingList(false)
          setMyPostFlag(false)
          setMyDemandFlag(false)
          setMytravel(false)
        }}>עריכת פרטים אישיים <i className="fa fa-pencil" aria-hidden="true"></i></button>

        <button className="myMenu mybtn shadow-lg  m-2 font-bold py-2 px-4  w-100  h-10" onClick={() => {
          setmyWaitingList(!myWaitingList)
          setmyEDIT(false)
          setMyPostFlag(false)
          setMyDemandFlag(false)
          setMytravel(false)
        }}>
          רשימת ההמתנה שלי <i className="fa fa-list" aria-hidden="true"></i></button>
        <div>

        </div>
        <button className="  myMenu shadow-lg m-2 mybtn  font-bold py-2 px-4  w-100  h-10" onClick={() => {
          setMyPostFlag(!MyPostflag)
          setMyDemandFlag(false)
          setmyWaitingList(false)
          setMytravel(false)
          setmyEDIT(false)
        }}>הפוסטים שלי <i class="fa fa-list-alt" aria-hidden="true"></i></button>


        <button className=" myMenu shadow-lg m-2 mybtn  font-bold py-2 px-4   w-100  h-10 " onClick={() => {
          setMyDemandFlag(!MyDemandflag)
          setMyPostFlag(false)
          setMytravel(false)
          setmyWaitingList(false)
          setmyEDIT(false)
        }}> הבקשות שלי<i className="fa fa-list" aria-hidden="true"></i></button>


        <button className=" myMenu m-2 shadow-lg   mybtn  font-bold py-2 px-4  w-100  h-10" onClick={() => {
          setMytravel(!myTravelFlag)
          setMyDemandFlag(false)
          setMyPostFlag(false)
          setmyWaitingList(false)
          setmyEDIT(false)
        }}> הנסיעות שלי <i class="fa fa-car" aria-hidden="true"></i></button>

<button className='button-89' onClick={()=>{logout()}}>התנתקי</button>
      </div>
<div className='container d-flex justify-content-center my-5'>
      <div className=' flex-wrap' style={{}}>
        {myEDITFlag && <UserEditProfile />}
        {myWaitingList && <UserWaitingList />}
        {MyPostflag && <MyPosts />}
        {MyDemandflag && <MyDemandsList />}
        {myTravelFlag && <MyTravelsList />}
      </div>
      </div>
    </div>
  );
};

export default PersonalArea;