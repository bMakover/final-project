import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import { useForm } from 'react-hook-form'
import { validateDate } from './validDate'
import GoogleMaps from './Demo'


const SingleEvent = (props) => {
    let item = props.item
    const [date, setDate] = useState()
    const [UpdateFlag, setUpdateFlag] = useState(false)
    const { methodAuthData } = apiService()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const nameRef = register("name", { required: true, minLength: 2 })
    const dateRef = register("date", { required: true, type: Date })
    const descriptionRef = register("description", { minLength: 4, required: true })
    const hourRef = register("hour", { required: true })
    let des = {}
    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateId").value, document.querySelector("#timeId").value)
        console.log(flag)
        if (flag == true && des.city) {
            const obj = {
                Name: databody.name,
                Date: databody.date,
                hour: databody.hour,
                location: des,
                description: databody.description,
                travels: item.travels,
                dateCreated: item.dateCreated
            }
            console.log(obj)
            const data = await methodAuthData(`events/${item._id}`, obj, "PUT")

        }
        else {
            alert("הכניסי כתובת שוב")
        }
    }
    const daleteEvent = async () => {
        try {
            const data = await methodAuthData(`events/${item._id}`, {}, "DELETE")
            console.log(data)
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }

    useEffect(() => {
        let d = new Date(item.Date)
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate)
    }, [])

    const handleSourceSelect = (obj) => {
        const parts = obj?.description.split(', ');
        console.log(parts)
        if (parts != undefined) {
            // המספר בית יהיה המספר הראשון שמופיע בקטע שבו יש מספרים
            const houseNumber = " "
            let street = parts[1];
            let city = parts[0];
            if (/\d+/.test(city)) {
                street = parts[0]
                city = parts[1]
            }
            if (street == "ישראל")
                street = " "
            const addressObject = {
                city,
                street,
                houseNumber
            };

            console.log(addressObject);
            return addressObject
        }
    }


    const handelDES = (obj) => {
        des = handleSourceSelect(obj)
    }

    return (
        <>
            <div>
                <div>
                    <p>שם האירוע:{item.Name}</p>
                    <p>מיקום האירוע: {item.location.city} {item.location.street} {item.location.houseNumber}</p>
                    <p>תאריך האירוע:{new Date(item.Date).toLocaleDateString()}</p>
                    <p>שעת האירוע:{item.hour}</p>
                    <p>פרטים:{item.description}</p>

                    <button onClick={() => {
                        setUpdateFlag(!UpdateFlag)
                    }}>עידכון האירוע</button>{UpdateFlag && <div>
                        <form onSubmit={handleSubmit(onSub)}>
                            <input {...nameRef} defaultValue={item.Name} type='text' />
                            <input {...dateRef} id="dateId" defaultValue={date} type='date' />
                            <input {...hourRef} id="timeId" defaultValue={item.hour} type='time' />
                            <textarea {...descriptionRef} defaultValue={item.description}></textarea>
                            <button>עדכון</button>
                        </form>
                        <GoogleMaps onInput={handelDES} />
                    </div>
                    }
                </div>
                <button onClick={() => { daleteEvent() }} >מחיקת האירוע</button>
            </div>

        </>
    )
}

export default SingleEvent