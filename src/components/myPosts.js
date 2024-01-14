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
        <div className='container d-flex flex-wrap align-items-start'>
            {myPosts?.map((item) => {
                const postId = item._id;
                return (<div className='border m-2 w-120' key={postId}>
                    <h2>הפוסט שלי</h2>
                    <p><strong>מיקום מקור נסיעה:</strong></p>
                    <p>{item.source.city}  {item.source.street}   {item.source.houseNumber}</p>
                    <p><strong>מיקום יעד נסיעה:</strong></p>
                    <p>{item.destination.city}  {item.destination.street}  {item.destination.houseNumber}</p>
                    <p><strong>תאור פוסט:</strong></p>
                    <p>{item.description}</p>
                    <p><strong>כמות מושבים:{item.seatsCount}</strong></p>
                    <p><strong>תאריך יציאה:</strong></p>
                    <p>{(new Date(item.departure.date)).toLocaleDateString()}</p>
                    <p><strong>שעת יציאה:</strong></p>
                    <p> {item.departure.hour}</p>
                    <img src='images/littelcar.png' style={{ width: "200px", height: "100px" }} />
                    <button   className="mybtn  font-bold py-2 px-4 rounded-full" onClick={() => {
                        setFlagUpdateMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button  className="mybtn  font-bold py-2 px-4 rounded-full"  onClick={() => {
                        setFlagDeleteMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button  className="mybtn  font-bold py-2 px-4 rounded-full6" onClick={() => {
                        setFlagPassengersMap((prev) => ({
                            ...prev,
                            [postId]: !prev[postId]
                        }));
                    }}> <i class="fa fa-list" aria-hidden="true"></i>  רשימת הנוסעים  </button>
                    {flagUpdateMap[postId] && <UpdateMyPost item={item} />}
                    {flagDeleteMap[postId] && <DeleteMyPost item={item} />}
                    {flagPassengersMap[postId] && <PassengersList itemId={item._id} />}
                </div>

                )
            })}



        </div>
    )
}

export default MyPosts