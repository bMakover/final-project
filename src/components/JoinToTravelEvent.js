import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import NewPost from './newPost'
import { useNavigate } from 'react-router'

const JoinToTravelEvent = ({ item }) => {
    const [idPost, setIDPost] = useState()
    const [flag, setflag] = useState(false)
    const nav = useNavigate()
    const { methodAuthData } = apiService()
    let obj
    let id = item._id
    useEffect(() => {
        if (idPost && item) {
            console.log(item._id)
            item.travels.push(idPost)
            obj = item
            delete obj._id
            delete obj.__v
            try {
                update()
            }
            catch (err) {
                alert("פג תוקף התחברותך התחברי שוב")
            }
        }


    }, [idPost])

    const update = async () => {
        console.log(item._id)
        await methodAuthData(`events/${id}`, obj, "PUT")
    }
    return (
        <div className='border m-3'>
            <p><strong>שם האירוע:</strong></p>
            <p>{item.Name}</p>
            <p><strong>כתובת:</strong></p>
            <p>{item.location.city} {item.location.street} {item.location.houseNumber}.</p>
            <p><strong>
                תאריך:</strong></p>
            <p>{new Date(item.Date).toLocaleDateString()}</p>
            <p><strong>שעה:</strong></p>
                <p>{item.hour}</p>
            <p><strong>
                פרטים:</strong></p>
                <p>{item.description}</p>

            <button  className="button-56 m-2" role="button" onClick={() => {
                setflag(!flag)
            }}>צור פוסט נסיעה לארוע זה</button>
<div>
            {flag &&
                <NewPost SetidEvent={setIDPost} />
            }</div>
        </div>
    )
}

export default JoinToTravelEvent