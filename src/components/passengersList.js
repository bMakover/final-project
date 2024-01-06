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
                return (<table className='table' key={item._id}>
                    <tr>
                    <th  className='p-1'>שם הנוסעת: </th>
                    <th  className='p-1'>טלפון:   </th>
                    <th  className='p-1'>אימייל: </th></tr>
                    <tr >
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                    </tr>
                </table>)
            })}
        </>
    )
}

export default PassengersList