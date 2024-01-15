import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '

const MyTravelsList = () => {
    const { getData, methodAuthData } = apiService()
    const [mytravels, setMyTravels] = useState()
    const [thisuser, setthisuser] = useState()
    useEffect(() => {
        const getMyTravels = async () => {
            try {
                const user = await methodAuthData("users/myInfo", {}, "GET")
                setthisuser(user.data)
                const data = await getData(`users/${user.data._id}/travels`)
                console.log(data.data)
                setMyTravels(data.data)
            }
            catch (err) {
                alert("פג תוקף התחברותך התחברי שוב")
            }

        }
        getMyTravels()
    }, [])



    const cancelJoin = async (travel) => {
        try {
            await methodAuthData(`posts/cancelJoin/${thisuser._id}/${travel._id}`, travel, "DELETE");
            setMyTravels((prevTravels) => prevTravels.filter((item) => item._id !== travel._id));
        } catch (err) {
            console.error("Error cancelling join:", err);
        }
    };
    return (
        <div className='container d-flex flex-wrap align-items-start'>
            {mytravels?.map(item => {
                return (
                    <div className='border m-2 w-80' key={item._id}>
                        <p><strong>מיקום מקור נסיעה:</strong></p>
                        <p>{item.source.city} {item.source.street} {item.source.houseNumber}</p>
                        <p><strong>יעד נסיעה:</strong> </p>
                        <p>{item.destination.city} {item.destination.street} {item.destination.houseNumber}</p>
                        <p><strong>פרטי פוסט:</strong></p>
                        <p>{item.description}</p>
                        <p><strong>כמות מושבים:</strong></p>
                        <p>{item.seatsCount}</p>
                        <p><strong>תאריך יציאה:</strong></p>
                        <p>{new Date(item.createDate).toLocaleDateString()}</p>
                        <button className="button-56 m-2" onClick={() => cancelJoin(item)}>
                            ביטול השתתפות
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyTravelsList