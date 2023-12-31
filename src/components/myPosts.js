import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import UpdateMyPost from './updateMyPost'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import DeleteMyPost from './deleteMyPost'

const MyPosts = () => {
    const { getData, methodAuthData } = apiService()
    const [myPosts, setMyPosts] = useState()
    const [flag, setFlagUpdate] = useState(false)
    const [Dflag, setDeleteFlag] = useState(false)
    const nav = useNavigate()
    const getmyPosts = async () => {
        const data = await methodAuthData("users/myPosts", {}, "GET")
        setMyPosts(data.data)
        console.log(data.data)
    }
    useEffect(() => {
        getmyPosts()
    }, [])

 
    return (
        <>
            {myPosts?.map((item) => {
                return (<div key={item._id}>

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
                    <p>תאריך יציאה:{item.departure.date},
                        {item.departure.hour}</p>
                    <p>---------------------------------------------</p>
                    <button onClick={() => {
                        setFlagUpdate(!flag)
                    }}>עדכון הפוסט</button> {flag && <UpdateMyPost item={item} />}
                    <button onClick={() => {
                        setDeleteFlag(!Dflag)
                    }}>מחיקת הפוסט</button>{Dflag&&<DeleteMyPost  item={item}/>}
                </div>

                )
            })}



        </>
    )
}

export default MyPosts