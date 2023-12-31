import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import SearchDrive from './components/SearchDrive'
import AvailableDrives from './components/AvailableDrives';
import Header from './components/header';
import Login from './components/Login'
import SignUp from './components/SignUp';
import UserWaitingList from './components/UserWaitingsList'
import HomePage from './components/homePage';
import NewPost from './components/newPost';
import ShowEvents from './components/showEvents';
import UserEditProfile from './components/UserEditProfile';
import MyDemandsList from './components/MyDemandsList';

function App() {

    return (
        <Router>
          <div>
          <Header />
            <section>                              
                <Routes>                
                <Route path="/" element={<HomePage/>}/>
{/*            
                   <Route path="/drives" element={<AvailableDrives/>}/> */}
                   <Route path="/login" element={<Login/>}/>
                   <Route path="/signup" element={<SignUp/>}/>
                   <Route path="/newPost" element={<NewPost/>}/>
                   <Route path="/drives" element={<AvailableDrives/>}/>

                   <Route path="/searchdrives" element={<SearchDrive/>}/>
                   <Route path="/waiting-list" element={<UserWaitingList/>}/>
                   <Route path="/demand-list" element={<MyDemandsList />}/>

                   <Route path="/events" element={<ShowEvents/>}/>
                   <Route path="/profile" element={<UserEditProfile />}/>





                </Routes>                    
            </section>
          </div>
        </Router>
    )

}

export default App;
