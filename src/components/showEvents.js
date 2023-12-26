import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import SingleEvent from './singleEvent'

const ShowEvents = () => {
    const { getData } = apiService()
    const [allEvents,setAllEvents]=useState()
    useEffect(()=>{
        const getAllEvents = async () => {
            const data = await getData("events/getAllEvents")
            console.log(data.data)
            setAllEvents(data.data)
        }
        getAllEvents()
    },[])
    return (
        <>
          {
                allEvents?.map(item => {
                    return (
                        <>
                            <SingleEvent key={item._id} item={item} />

                        </>
                    )
                })
            }
        </>
    )
}

export default ShowEvents