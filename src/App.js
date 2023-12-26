import './App.css';
import Login from './components/UserLogin';
import RegistrationForm from './components/UserRegister';
import Header from './components/header';
import HomePage from './components/homePage';
import NewPost from './components/newPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShowPost from './components/showPost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path='/newPost' element={<NewPost />}></Route>
          <Route path='/showSinglePost' element={<ShowPost />}></Route>
          <Route path="*" element={<h2>Page 404 page not found</h2>}></Route>
        </Routes>
      </BrowserRouter></>

  );
}

export default App;
