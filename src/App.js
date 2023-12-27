import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/UserRegister.js'
import Login from './components/UserLogin.js';
import UserEditProfile from './components/UserEditProfile.js';
import UserWaitingList from './components/UserWaitingsList.js';

function App() {
    return (
        <div>
          <h1>User Registration App</h1>
          <RegistrationForm />
          <Login/>
          <UserWaitingList/>
        </div>
      );
}

export default App;
