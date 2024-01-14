import React, { useContext, useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import { AppContext } from '../context/context';
const ShowPost = (props) => {
    const { MyLogUser, setMyLogUser } = useContext(AppContext);

    let item = props.item
    const [driverDetails, setDriverDetails] = useState()
    const { getData, methodAuthData } = apiService()
    useEffect(() => {
        const getMyInfo = async () => {
            const id = item.idDriver
            const user = await getData(`users/${id}`)
            const driver = user.data
            setDriverDetails(driver)
        }
        try {
            getMyInfo()
            console.log(item)
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }


    }, [])

    const joinToTravel = async () => {
        try {
            console.log(MyLogUser)
            console.log(item)
            if (MyLogUser != null) {
                if (item.passengersList.includes(MyLogUser._id) == false) {
                    item.passengersList.push(MyLogUser._id)
                    let obj = {
                        createDate: item.createDate,
                        departure: item.departure,
                        description: item.description,
                        destination: item.destination,
                        idDriver: item.idDriver,
                        isDisplay: item.isDisplay,
                        passengersList: item.passengersList,
                        seatsCount: item.seatsCount,
                        source: item.source,
                        updateDate: item.updateDate,
                        waitingList: item.waitingList
                    };
                    let res = await methodAuthData(`posts/${item._id}/putPassengerList`, obj, "PUT")
                    console.log(res)
                    userUpdate()
                    alert("הצטרפת בהצלחה!!")
                }
                else {
                         alert(" נירשמת לנסיעה זו כבר")
                }
            }
            else {
                alert(" על מנת להצטרף לנסיעה  עלייך להתחבר תחילה")
            }
        }
        catch (err) {
            alert("ישנה בעיה נסי מאוחר יותר!")
        }

    }
    const userUpdate = async () => {
        let user = await methodAuthData("users/myInfoWithPass", {}, "GET")
        user = user.data
        user.travels.push(item._id)
        const userid = user._id
        delete user._id
        delete user.__v
        delete user.password
        let data = await methodAuthData(`users/updateUserPosts/${userid}`, user, "PUT")
        console.log(data)
    }
    return (

        <div className='  col-md-4 col-sm-12 col-lg-4 col-xl-4 p-0 m-0' >
            <button className='myPostButton ' data-toggle="modal" data-target={`#myModal-${item._id}`} style={{ backgroundImage: 'url("images/steering wheel.jpg")', height: "280px", minWidth: "280px", color: 'white', color: 'white', backgroundColor: 'rgba(255, 0, 0, 1)' }}>
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
            <div className="  modal-dialog-scrollable modal fade m-0" id={`myModal-${item._id}`} role="dialog">
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
                            <strong>זמן יציאה:</strong>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: "0px", padding: "0px" }}>
                                <p>{new Date(item.departure.date).toLocaleDateString()}  {item.departure.hour}</p>
                                <img src='images/littelcar.png' style={{ width: "200px", height: "100px" }} />
                            </div>
                        </div>
                        <button className='button-56 m-2 w-60' onClick={() => { joinToTravel() }}>הצטרפי לנסיעה</button>
                    </div>
                </div></div>
        </div>
    )
}

export default ShowPost