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


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path='/newPost' element={<NewPost />}></Route>
          <Route path='/showSinglePost' element={<ShowPost />}></Route>
          <Route path="/SearchDrive" element={<SearchDrive />} />
          <Route path="/drives" element={<AvailableDrives />} />
        <Route path="/event" element={<JoinToTravelEvent />} />
          {/* <Route path="/try" element={<Try />} />  */}
               <Route path="/admin" element={<AdminFeature />} />
          <Route path="*" element={<h2>Page 404 page not found</h2>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Exmple/> */}
      </>


  );
}

export default App;
