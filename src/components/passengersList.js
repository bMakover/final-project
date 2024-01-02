import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '

const PassengersList = ({ itemId }) => {
    const [myPassengers, setMyPassengers] = useState()
    const { getData, methodAuthData } = apiService()
    useEffect(() => {
        const getPassengers = async () => {
            const postData = await methodAuthData(`posts/passengersList/${itemId}`, {}, "GET")
            console.log(postData)
            setMyPassengers(postData.data)
        }
        getPassengers()
    }, [])
    return (
        <>
            {myPassengers?.map(item => {
                return (<div  key={item._id}style={{border:"solid black 2px"}}>
                    <p>שם הנוסעת:{item.fullName}</p>
                    <p>פרטים ליצירת קשר</p>
                    <p>  טלפון:   {item.phone}</p>
                    <p>אימייל:{item.email}</p>
                </div>)
            })}
        </>
    )
}

export default PassengersList