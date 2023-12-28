import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import SingleEvent from './singleEvent'
import SearchEvents from './searchEvents'

const ShowEvents = () => {
    const { getData } = apiService()
    const [allEvents, setAllEvents] = useState([])
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
            {allEvents?.map((item, i) => (
                <SingleEvent item={item} key={item._id} />
            ))}
        </>
    )
}

export default ShowEvents