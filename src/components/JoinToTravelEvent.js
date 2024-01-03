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
        <>
            <p>שם האירוע:{item.Name}</p>
            <p>כתובת:{item.location.city} {item.location.street} {item.location.houseNumber}</p>
            <p>תאריך:{new Date(item.Date).toLocaleDateString()}</p>
            <p>שעה:{item.hour}</p>
            <p>פרטים:{item.description}</p>

            <button  className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                setflag(!flag)
            }}>צור פוסט נסיעה לארוע זה</button>

            {flag &&
                <NewPost SetidEvent={setIDPost} />
            }
        </>
    )
}

export default JoinToTravelEvent