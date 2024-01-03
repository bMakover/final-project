import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '

const MyTravelsList = () => {
    const { getData, methodAuthData } = apiService()
    const [mytravels, setMyTravels] = useState()
    const [thisuser, setthisuser] = useState()
    useEffect(() => {
        const getMyTravels = async () => {
            const user = await methodAuthData("users/myInfo", {}, "GET")
            setthisuser(user.data)
            const data = await getData(`users/${user.data._id}/travels`)
            console.log(data.data)
            setMyTravels(data.data)

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
        <>
            {mytravels?.map(item => {
                return (
                    <div key={item._id}>
                        <p>מיקום מקור נסיעה:</p>
                        <p>עיר:{item.source.city}</p>
                        {item.source.street && <p>רחוב:{item.source.street}</p>}
                        {item.source.houseNumber && <p>מספר בית:{item.source.houseNumber}</p>}
                        <p>מיקום יעד נסיעה:</p>
                        <p>עיר:{item.destination.city}</p>
                        {item.destination.street && <p>רחוב:{item.destination.street}</p>}
                        {item.destination.houseNumber && <p> מספר בית:{item.destination.houseNumber}</p>}
                        <p>תאור פוסט:</p>
                        <p>{item.description}</p>
                        <p>כמות מושבים:{item.seatsCount}</p>
                        <p>תאריך יציאה:{new Date(item.createDate).toLocaleDateString()}</p>
                        <button  className="mybtn text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                            cancelJoin(item)
                        }}>ביטול השתתפות</button>
                    </div>
                )
            })}
        </>
    )
}

export default MyTravelsList