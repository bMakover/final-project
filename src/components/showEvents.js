import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import SingleEvent from './singleEvent'
import SearchEvents from './searchEvents'
import JoinToTravelEvent from './JoinToTravelEvent'

const ShowEvents = () => {
    const { getData } = apiService()
    const [allEvents, setAllEvents] = useState([])
    let role="user"
    useEffect(() => {
        const getAllEvents = async () => {
            const data = await getData("events/getAllEvents")
            setAllEvents(data.data)
        }
        getAllEvents()
    }, [])
    const setData = (data) => {
        setAllEvents(data)
    }


    return (
        <>

            <SearchEvents  items={allEvents} setData={setData} />
            {role=="admin"?allEvents?.map((item, i) => (
                <SingleEvent item={item} key={item._id} />
            )) :allEvents?.map((item, i) => (
                <JoinToTravelEvent item={item} key={item._id} />
            ))}
           
        </>
    )
}

export default ShowEvents