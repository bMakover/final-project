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
    let id=item._id
    useEffect(() => {
        if (idPost && item) {
            console.log(item._id)
            item.travels.push(idPost)
            obj = item
            delete obj._id
            delete obj.__v
            update()
        }


    }, [idPost])

    const update = async () => {
        console.log(item._id)
        await methodAuthData(`events/${id}`, obj, "PUT")
    }
    return (
        <>
            <p>{item.Name}</p>
            <p>{item.location.city}</p>
            <p>{item.location.street}</p>
            <p>{item.location.houseNumber}</p>
            <p>{item.Date}</p>
            <p>{item.description}</p>
            <p>{item.hour}</p>
            <button onClick={() => {
                setflag(!flag)
            }}>צור פוסט נסיעה לארוע זה</button>

            {flag &&
                <NewPost SetidEvent={setIDPost} />
            }
        </>
    )
}

export default JoinToTravelEvent