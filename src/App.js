import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import SearchDrive from './components/SearchDrive'
import AvailableDrives from './components/AvailableDrives';
import PreDemo from './components/PreDemo'
import Try from './components/try'

function App() {

    return (
        <Router>
          <div>
            <section>                              
                <Routes>                
                <Route path="/" element={<SearchDrive/>}/>
           
                   <Route path="/drives" element={<AvailableDrives/>}/>
                   <Route path="/demo" element={<PreDemo/>}/>
                   <Route path="/try" element={<Try/>}/>


                 

                  
                </Routes>                    
            </section>
          </div>
        </Router>
    )

}

export default App;
