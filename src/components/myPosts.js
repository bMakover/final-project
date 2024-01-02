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
        try {
            const data = await methodAuthData("users/myPosts", {}, "GET")
            setMyPosts(data.data)
            console.log(data.data)
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }
    useEffect(() => {

        getmyPosts()


    }, [])



    return (
        <>
            {myPosts?.map((item) => {
                const postId = item._id;
                return (<div key={postId}>

                    <p>מיקום מקור נסיעה:</p>
                    <p>כתובת:{item.source.city}  {item.source.street}   {item.source.houseNumber}</p>
                    <p>מיקום יעד נסיעה:</p>
                    <p>כתובת:{item.destination.city}  {item.destination.street}  {item.destination.houseNumber}</p>
                    <p>תאור פוסט:</p>
                    <p>{item.description}</p>
                    <p>כמות מושבים:{item.seatsCount}</p>
                    <p>תאריך יציאה:{(new Date(item.departure.date)).toLocaleDateString()}</p>
                    <p>שעת יציאה: {item.departure.hour}</p>
                    <button onClick={() => {
                        setFlagUpdateMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}><i className="fa fa-pencil" aria-hidden="true"></i></button> {flagUpdateMap[postId] && <UpdateMyPost item={item} />}
                    <button onClick={() => {
                        setFlagDeleteMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}><i class="fa fa-trash" aria-hidden="true"></i></button>{flagDeleteMap[postId] && <DeleteMyPost item={item} />}
                    <button onClick={() => {
                        setFlagPassengersMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}> <i class="fa fa-list" aria-hidden="true"></i>  רשימת הנוסעים  </button>{flagPassengersMap[postId] && <PassengersList itemId={item._id} />}
                </div>

                )
            })}



        </>
    )
}

export default MyPosts