import React, { useState } from 'react'
import NewEvent from './newEvent'
import ShowEvents from './showEvents'

const AdminFeature = () => {
    const [newEventFlag, setNewEventFlag] = useState()
    const [seeEventsFlag, setseeEventsFlag] = useState()
    return (
        <>
            <button  className=' class="btn btn-white btn-animation-1' onClick={() => {
                setNewEventFlag(!newEventFlag)
            }}>הוספת אירוע  <i class="fa fa-plus" aria-hidden="true"></i></button>
            {newEventFlag && <NewEvent />}
           
           
            <button onClick={() => {
                setseeEventsFlag(!seeEventsFlag)
            }}>צפייה באירועים <i class="fa fa-eye" aria-hidden="true"></i></button>
            {seeEventsFlag && <ShowEvents />}
        </>
    )
}

export default AdminFeature