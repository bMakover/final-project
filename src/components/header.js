import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiService } from '../services/apiService '

const Header = () => {
    const { methodAuthData } = apiService()
    const [formatDate, setFormData] = useState()
    const nav = useNavigate()
    useEffect(() => {

        const getMyData = async () => {
            try {
                const response = await methodAuthData('users/myInfo', {}, 'GET');
                let userData = response.data;
                console.log(userData);
                setFormData(userData);
            }
            catch (err) {

                alert("לחוויה מלאה התחברי תחילה!")
            }
        }
        getMyData()
    }, [])
    return (
        <><header style={{ width: "100%", height: "120px" }} className="container-fluid  navbar navbar-expand bg-dark w-100% ">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="container" style={{ width: "5000px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="row" style={{ justifyContent: "flex-start" }}>
                    <div className=''>
                    </div>
                    <nav className='nav-col-auto  navbar-nav p-0 justify-content-around'>
                        <ul className='d-flex justify-content-around align-items-center'>
                            <li >
                                <i class="fa fa-sign-in " aria-hidden="true" style={{ color: "white", fontSize: "large", fontSmooth: "large" }}></i>
                                <Link className='m-3 text-light ' to="/login" > התחברות</Link></li>
                            <li>
                                <i class="fa fa-user-plus" aria-hidden="true" style={{ color: "white" }}></i>
                                <Link className='m-3  text-light' to="/register"> הרשמה</Link></li>
                            <li>
                                <i class="fa fa-calendar-o" aria-hidden="true" style={{ color: "white" }}></i>

                                <Link className='m-3  text-light' to="/events"> אירועים</Link></li>
                            <li className='nav-item'>
                                <i class="fa fa-car" aria-hidden="true" style={{ color: "white" }}></i>

                                <Link className='m-3  text-light' to="/newPost">יצירת פוסט</Link></li>


                                <li className='nav-item'>
                                <i class="fa fa-search" aria-hidden="true" style={{ color: "white" }}></i>

                                <Link className='m-3  text-light' to="/SearchDrive">חיפוש נסיעה/פוסט </Link></li>
                        </ul>

                        <div>
                            {formatDate?.image && formatDate?.image != null ?
                                <div style={{ cursor: 'pointer' }} onClick={() => { nav("/PersonalArea") }}>  <img src={formatDate?.image} style={{ width: "70px", borderRadius: "50%", margin: 'auto' }} />
                                    <p className='text-white'>שלום {formatDate?.fullName}</p></div> :
                                <div>
                                    <img onClick={() => { nav("/PersonalArea") }} src="images/user.png" style={{ width: "70px", cursor: 'pointer', borderRadius: "50%", margin: 'auto' }} />
                                    <p className='text-white'>שלום {formatDate?.fullName}</p>
                                </div>}
                        </div>
                    </nav>

                </div>
            </div>
        </header>

        </>
    )
}

export default Header
