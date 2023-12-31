import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <><header style={{ width: "1100px" }} className="container-fluid  navbar navbar-expand bg-dark ">
            <div className="container" style={{ width: "100%" }}>
                <div className="row align-items-center">
                    <div className='col-auto'>
                    </div>
                    <nav className='nav-col-auto  navbar-nav p-0'>
                        <ul className='d-flex '>
                            <li className='nav-item'><Link className='m-3  text-light' to="/newPost">הוספת פוסט</Link></li>
                            <li><Link className='m-3 text-light ' to="/login" > התחברות</Link></li>
                            <li><Link className='m-3  text-light' to="/register"> הרשמה</Link></li>
                            <li><Link className='m-3  text-light' to="/events"> אירועים</Link></li>
                            <li><Link className='m-3  text-light' to="/myPosts"> אירועים</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header