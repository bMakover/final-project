import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import UpdateMyPost from './updateMyPost'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import DeleteMyPost from './deleteMyPost'
import PassengersList from './passengersList'

const MyPosts = () => {
    const { getData, methodAuthData } = apiService()
    const [myPosts, setMyPosts] = useState()
    const [flagUpdateMap, setFlagUpdateMap] = useState({});
    const [flagDeleteMap, setFlagDeleteMap] = useState({});
    const [flagPassengersMap, setFlagPassengersMap] = useState({});
    const nav = useNavigate()
    const getmyPosts = async () => {
        const data = await methodAuthData("users/myPosts", {}, "GET")
        setMyPosts(data.data)
        console.log(data.data)

    }
    useEffect(() => {
        try {
            getmyPosts()
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }, [])



    return (
        <>
            {myPosts?.map((item) => {
                const postId = item._id;
                return (<div key={postId}>

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
                    <p>תאריך יציאה:{(new Date(item.departure.date)).toLocaleDateString()},
                        {item.departure.hour}</p>
                    <button onClick={() => {
                        setFlagUpdateMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}>עדכון הפוסט</button> {flagUpdateMap[postId] && <UpdateMyPost item={item} />}
                    <button onClick={() => {
                        setFlagDeleteMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}>מחיקת הפוסט</button>{flagDeleteMap[postId] && <DeleteMyPost item={item} />}
                    <button onClick={() => {
                        setFlagPassengersMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}>רשימת הנוסעים</button>{flagPassengersMap[postId]&&<PassengersList itemId={item._id} />}
                </div>

                )
            })}



        </>
    )
}

export default MyPosts