import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import SingleEvent from './singleEvent'
import SearchEvents from './searchEvents'
import JoinToTravelEvent from './JoinToTravelEvent'

const ShowEvents = () => {
    const { getData, methodAuthData } = apiService()
    const [allEvents, setAllEvents] = useState([])
    const [thisUser, setThisUser] = useState([])
    useEffect(() => {

        const getAllEvents = async () => {
            const user = await methodAuthData("users/myInfo", {}, "GET")
            setThisUser(user.data)
            const data = await getData("events/getAllEvents")
            setAllEvents(data.data)
        }
        try { getAllEvents() }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }, [])
    const setData = (data) => {
        setAllEvents(data)
    }


    return (
        <>

            <SearchEvents items={allEvents} setData={setData} />
            {thisUser.role == "admin" ? allEvents?.map((item, i) => (
                <SingleEvent item={item} key={item._id} />
            )) : allEvents?.map((item, i) => (
                <JoinToTravelEvent item={item} key={item._id} />
            ))}

        </>
    )
}

export default ShowEvents