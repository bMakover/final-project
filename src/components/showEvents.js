import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import SingleEvent from './singleEvent'
import SearchEvents from './searchEvents'
import JoinToTravelEvent from './JoinToTravelEvent'
import NewEvent from './newEvent'

const ShowEvents = () => {
    const { getData, methodAuthData } = apiService()
    const [allEvents, setAllEvents] = useState([])
    const [thisUser, setThisUser] = useState([])
    const [newEventFlag, setNewEventFlag] = useState()
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
            {thisUser.role == "admin" ? <>{allEvents?.map((item, i) => (
                <SingleEvent item={item} key={item._id} />
            ))}  <button className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                setNewEventFlag(!newEventFlag)
            }}>הוספת אירוע  <i class="fa fa-plus" aria-hidden="true"></i></button>
            {newEventFlag && <NewEvent />}</>: allEvents?.map((item, i) => (
                <JoinToTravelEvent item={item} key={item._id} />
            ))}

        </>
    )
}

export default ShowEvents