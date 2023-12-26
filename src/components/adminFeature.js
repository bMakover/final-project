import React, { useState } from 'react'
import NewEvent from './newEvent'
import ShowEvents from './showEvents'

const AdminFeature = () => {
    const [newEventFlag, setNewEventFlag] = useState()
    const [seeEventsFlag, setseeEventsFlag] = useState()
    return (
        <>
            <button onClick={() => {
                setNewEventFlag(!newEventFlag)
            }}>הוספת אירוע</button>
            {newEventFlag && <NewEvent />}
           
           
            <button onClick={() => {
                setseeEventsFlag(!seeEventsFlag)
            }}>צפייה באירועים</button>
            {seeEventsFlag && <ShowEvents />}
        </>
    )
}

export default AdminFeature