import React, { useState } from 'react'
import NewEvent from './newEvent'
import ShowEvents from './showEvents'

const AdminFeature = () => {
    // const [newEventFlag, setNewEventFlag] = useState()
    const [seeEventsFlag, setseeEventsFlag] = useState()
    return (
        <>
            {/* <button className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                setNewEventFlag(!newEventFlag)
            }}>הוספת אירוע  <i class="fa fa-plus" aria-hidden="true"></i></button>
            {newEventFlag && <NewEvent />} */}
           
           
            {/* <button className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                setseeEventsFlag(!seeEventsFlag)
            }}>צפייה באירועים <i class="fa fa-eye" aria-hidden="true"></i></button> */}
         <ShowEvents />
        </>
    )
}

export default AdminFeature