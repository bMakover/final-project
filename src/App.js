import './App.css';
import Login from './components/Login';
import Header from './components/header';
import HomePage from './components/homePage';
import NewPost from './components/newPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowPost from './components/showPost';
import SearchDrive from './components/SearchDrive';
import AvailableDrives from './components/AvailableDrives';
import NewEvent from './components/newEvent';
import AdminFeature from './components/adminFeature';
import SignUp from './components/SignUp';
import Exmple from './components/exmple';
import JoinToTravelEvent from './components/JoinToTravelEvent';
import MyPosts from './components/myPosts';
import UpdateMyPost from './components/updateMyPost';
import MyTravelsList from './components/myTravelsList';
import "./cssFiles/buttons.css"
import PersonalArea from './components/PersonalArea';
import Footer from './components/footer';
import { AppContext } from './context/context'
import { useState } from 'react';

function App() {
  const [MyLogUser,setMyLogUser]=useState(null)
  
  return (
    <>
      <BrowserRouter>
      <AppContext.Provider value={{
      MyLogUser,setMyLogUser
      }}>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path='/newPost' element={<NewPost />}></Route>
          <Route path='/showSinglePost' element={<ShowPost />}></Route>
          <Route path="/SearchDrive" element={<SearchDrive />} />
          <Route path="/drives" element={<AvailableDrives />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/updateMyPost" element={<UpdateMyPost />} />
          <Route path="/travelslist" element={<MyTravelsList />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<AdminFeature />} />
          <Route path="/PersonalArea" element={<PersonalArea />} />
          <Route path="/ex" element={<Exmple />} />
          <Route path="*" element={<h2>Page 404 page not found</h2>}></Route>
        </Routes>
        </AppContext.Provider>
        <Footer />
      </BrowserRouter>
      {/* <Exmple/> */}

    </>


  );
}

export default App;
