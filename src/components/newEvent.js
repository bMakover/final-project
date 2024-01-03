import React from 'react'
import { useForm } from 'react-hook-form'
import { apiService } from '../services/apiService '
import { validateDate } from './validDate'
import GoogleMaps from './Demo'
const NewEvent = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    let src = {}
    const { methodAuthData } = apiService()
    const nameRef = register("name", { required: true, minLength: 2 })
    const dateRef = register("date", { required: true, type: Date })
    const descriptionRef = register("description", { minLength: 4, required: true })
    const hourRef = register("hour", { required: true })

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

    const handelSRC = (obj) => {
        src = handleSourceSelect(obj)
    }


    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateInput").value, document.querySelector("#timeInput").value)
        try {
            if (flag == true && src.city != " ") {
                const obj = {
                    Name: databody.name,
                    Date: databody.date,
                    hour: databody.hour,
                    location: src,
                    description: databody.description,
                    travels: [],
                    dateCreated: new Date(Date.now())
                }
                await methodAuthData("events/", obj, "POST")
                console.log(obj)
                console.log(databody)
            }
            else {
                alert("הכנס כתובת שוב")
            }
        } catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSub)}>
                <label>שם האירוע</label>
                <input  {...nameRef} type='text' />
                {errors.name && <div>*חובה להכניס עיר מקור</div>}
                <label>תאריך</label>
                <input id="dateInput"  {...dateRef} type='date' />
                {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
                <label >שעה:</label>
                <input id="timeInput"  {...hourRef} type='time' />
                {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
                <label>תאור האירוע</label>
                <textarea  {...descriptionRef}></textarea>
                {errors.description && <div>חובה להכניס תאור*</div>}
                <button className="mybtn text-white font-bold py-2 px-4 rounded-full">פרסום האירוע</button>
            </form>
            <GoogleMaps onInput={handelSRC} />
        </>
    )
}

export default NewEvent