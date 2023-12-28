import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '

const ShowPost = (props) => {
    let item = props.item
    const [flag, setflag] = useState(false)
    const [driverDetails, setDriverDetails] = useState()
    const { getData } = apiService()
    useEffect(() => {
        const getMyInfo = async () => {
            const id = item.idDriver
            const user = await getData(`users/${id}`)
            const driver = user.data
            setDriverDetails(driver)
        }
        getMyInfo()

    }, [])

    
    return (

        <><div>
            <button onClick={() => { setflag(!flag) }}>צפייה בפוסט</button></div>
            {flag &&
                <div class="container">
                    <div class="row">
                        <div>
                            <p>שם הנהגת: {driverDetails?.fullName}</p>
                            <p>פרטי יצירת קשר:</p>
                            <p> אימייל:{driverDetails?.email}</p>
                            <p> טלפון:{driverDetails?.phone}</p>

                        </div>
                        <p>מיקום מקור נסיעה:</p>
                        <p>עיר:{item.source.city}</p>
                        {item.source.street && <p>רחוב:{item.source.street}</p>}
                        {item.source.houseNumber && <p>מספר בית:{item.source.houseNumber}</p>}
                        <p>מיקום יעד נסיעה:</p>
                        <p>עיר:{item.destination.city}</p>
                        {item.destination.street && <p>רחוב:{item.destination.street}</p>}
                        {item.destination.houseNumber && <p> מספר בית:{item.destination.houseNumber}</p>}
                        <p>תאור פוסט:</p>
                        <p>{item.description}</p>
                        <p>כמות מושבים:{item.seatsCount}</p>
                        <p>תאריך יציאה:{item.createDate}</p>
                        
                        <p>---------------------------------------------</p>
                    </div>
                </div>}
        </>
    )
}

export default ShowPost