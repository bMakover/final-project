import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import { useForm } from 'react-hook-form'
import { validateDate } from './validDate'


const SingleEvent = (props) => {
    let item = props.item
    const [date, setDate] = useState()
    const [UpdateFlag, setUpdateFlag] = useState(false)
    const { methodAuthData } = apiService()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const nameRef = register("name", { required: true, minLength: 2 })
    const location_cityRef = register("location_city", { required: true, minLength: 2 })
    const location_streetRef = register("location_street", { minLength: 2 })
    const location_houseNumberRef = register("location_houseNumber", { minLength: 1 })
    const dateRef = register("date", { required: true, type: Date })
    const descriptionRef = register("description", { minLength: 4, required: true })
    const hourRef = register("hour", { required: true })

    const onSub = async (databody) => {
        let t = validateDate(document.querySelector("#dateId").value, document.querySelector("#timeId").value)
        const obj = {
            Name: databody.name,
            Date: databody.date,
            hour: databody.hour,
            location: {
                city: databody.location_city,
                street: databody.location_street,
                houseNumber: databody.location_houseNumber
            },
            description: databody.description,
            travels: item.travels,
            dateCreated: item.dateCreated
        }
        console.log(obj)
        const data = await methodAuthData(`events/${item._id}`, obj, "PUT")
        console.log(data)
    }
    const daleteEvent = async () => {
        const data = await methodAuthData(`events/${item._id}`, {}, "DELETE")
    }

    useEffect(() => {
        let d = new Date(item.Date)
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate)
        console.log(formattedDate)
    }, [])

    return (
        <>
            <div>
                <div>
                    <p>{item.Name}</p>
                    <p>{item.location.city}</p>
                    <p>{item.location.street}</p>
                    <p>{item.location.houseNumber}</p>
                    <p>{item.Date}</p>
                    <p>{item.description}</p>
                    <p>{item.hour}</p>
                    <button onClick={() => {
                        setUpdateFlag(!UpdateFlag)
                    }}>עידכון האירוע</button>{UpdateFlag &&
                        <form onSubmit={handleSubmit(onSub)}>
                            <input {...nameRef} defaultValue={item.Name} type='text' />
                            <input {...location_cityRef} defaultValue={item.location.city} type='text' />
                            <input {...location_streetRef} defaultValue={item.location.street} type='text' />
                            <input  {...location_houseNumberRef} defaultValue={item.location.houseNumber} type='text' />
                            <input {...dateRef} id="dateId" defaultValue={date} type='date' />
                            <input {...hourRef} id="timeId" defaultValue={item.hour} type='time' />
                            <textarea {...descriptionRef} defaultValue={item.description}></textarea>
                            <button>עדכון</button>
                        </form>
                    }
                </div>
                <button onClick={() => { daleteEvent() }} >מחיקת האירוע</button>
            </div>

        </>
    )
}

export default SingleEvent