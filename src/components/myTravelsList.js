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



    const cancelJoin = async (arg) => {
        try {
            let arr = thisuser.travels.filter(val => { return val != arg._id });
            let obj = thisuser
            let userID = thisuser._id
            let TravelID = arg._id
            obj.travels = arr
            delete obj._id
            delete obj.__v
            console.log(obj)
            console.log(userID)
            const user = await methodAuthData(`users/updateUserPosts/${userID}`, obj, "PUT")
            let Parr = arg.passengersList.filter(val => { return val != userID });
            let Pobj = arg
            Pobj.passengersList = Parr
            delete Pobj._id
            delete Pobj.__v
            console.log(Pobj)
            const post = await methodAuthData(`posts/${TravelID}`, Pobj, "PUT")
            alert("השתתפותך בוטלה בהצלחה!!")
        }
        catch (err) {
            alert(" נסי להתחבר שוב פוסט זה ככל הנראה נמחק!")
        }


    }
    return (
        <div className='container d-flex d-flex-wrap align-items-start'>
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
                        <button className="mybtn text-white font-bold py-2 px-4 rounded-full m-2" onClick={() => {
                            cancelJoin(item)
                        }}>ביטול השתתפות</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyTravelsList