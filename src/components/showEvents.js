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
            try {
                const user = await methodAuthData("users/myInfo", {}, "GET")
                setThisUser(user.data)
                const data = await getData("events/getAllEvents")
                setAllEvents(data.data)
                { }
            }
            catch (err) {
                alert("פג תוקף התחברותך התחברי שוב")
            }
        }
        getAllEvents()

    }, [])
    const setData = (data) => {
        setAllEvents(data)
    }


    return (
        <div className='container-fluid'>

            <SearchEvents items={allEvents} setData={setData} />
            {thisUser.role == "admin" ? <>{allEvents?.map((item, i) => (
                <SingleEvent item={item} key={item._id} />
            ))}  <button className="button-56" onClick={() => {
                setNewEventFlag(!newEventFlag)
            }}>הוספת אירוע  <i class="fa fa-plus" aria-hidden="true"></i></button>
                {newEventFlag && <NewEvent />}</> : <div className='container' >
                {allEvents?.map((item, i) => (
                    <JoinToTravelEvent item={item} key={item._id} />))}</div>

            }

        </div>
    )
}

export default ShowEvents