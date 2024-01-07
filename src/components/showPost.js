import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '

const ShowPost = (props) => {
    let item = props.item
    const [driverDetails, setDriverDetails] = useState()
    const { getData } = apiService()
    useEffect(() => {
        const getMyInfo = async () => {
            const id = item.idDriver
            const user = await getData(`users/${id}`)
            const driver = user.data
            setDriverDetails(driver)
        }
        try {
            getMyInfo()
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }


    }, [])


    return (

        <div  className='  col-md-4 col-sm-12 col-lg-4 col-xl-4 p-0 m-0' >
            <button className='myPostButton ' data-toggle="modal" data-target="#myModal" style={{  backgroundImage: 'url("images/steering wheel.jpg")',height: "280px",minWidth:"280px", color: 'white',color: 'white', backgroundColor: 'rgba(255, 0, 0, 1)'}}>
                <strong>
                    הפוסט של:</strong>
                {driverDetails?.fullName}<br></br>
                <strong>
                    מקור:</strong>{item.source.city}<br></br>
                <strong>
                    יעד:</strong>{item.destination.city}<br></br>
                <strong>
                    צפייה בפוסט &gt;&gt;</strong>
            </button>
                <div className="  modal-dialog-scrollable modal fade m-0" id='myModal' role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="row modal-content mypost" style={{ borderRadius: "20px" }}>
                            <div className="modal-header"> <h4 className="modal-title" style={{ direction: 'rtl' }}>פרטי הפוסט</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>

                            </div>
                            <div>
                                <strong>שם הנהגת: </strong> 
                                <p> {driverDetails?.fullName}</p>  
                                <strong>פרטי יצירת קשר:</strong><br></br>
                                <strong> אימייל:</strong>
                                <p>{driverDetails?.email}</p>
                                <strong> טלפון:</strong>
                                <p>{driverDetails?.phone}</p>

                            </div>
                            <div >
                            <strong>כתובת מקור נסיעה:</strong>
                            <p>{item.source.city} {item.source.street} {item.source.houseNumber}</p>
                            <strong>כתובת יעד נסיעה:</strong>
                            <p>{item.destination.city} {item.destination.street} {item.destination.houseNumber}</p>
                            <strong>תאור פוסט:</strong>
                            <p>{item.description}</p>
                            <strong>כמות מושבים:</strong>
                            <p>  {item.seatsCount}</p>
                            <strong>תאריך יציאה:</strong>
                            <div style={{ width:'100%',display:'flex',justifyContent:'space-between',margin:"0px",padding:"0px"}}>
                            <p>{new Date(item.departure.date).toLocaleDateString()}  {item.departure.hour}</p>
                            <img src='images/littelcar.png' style={{width:"200px",height:"100px"}}/>
                            </div>
                            </div>
                        </div>
                    </div></div>
        </div>
    )
}

export default ShowPost