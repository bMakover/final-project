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
    return (<>
    {myPassengers?.length>0?
        <table className='table' >
            <tr>
                <th className='p-1'>שם הנוסעת: </th>
                <th className='p-1'>טלפון:   </th>
                <th className='p-1'>אימייל: </th></tr>
            {myPassengers?.map(item => {
                return (
                    <tr >
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                    </tr>
                )
            })}
        </table>:<p>אין נוסעים מצורפים כרגע</p>}
    </>
    )
}

export default PassengersList