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
            const houseNumber = parts[parts.length-4]||" "
            let street = parts[parts.length-3]||" ";
            let city = parts[parts.length-2];
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
                alert("האירוע נוסף בהצלחה!")
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
            {/* <p><strong>שם האירוע:</strong></p>
            <p>{item.Name}</p>
            <p><strong>כתובת:</strong></p>
            <p>{item.location.city} {item.location.street} {item.location.houseNumber}.</p>
            <p><strong>
                תאריך:</strong></p>
            <p>{new Date(item.Date).toLocaleDateString()}</p>
            <p><strong>שעה:</strong></p>
                <p>{item.hour}</p>
            <p><strong>
                פרטים:</strong></p>
                <p>{item.description}</p>
 */} <p><strong>כתובת:</strong></p>
            <GoogleMaps onInput={handelSRC} />
            <form onSubmit={handleSubmit(onSub)}>
                <p><strong>שם האירוע:</strong></p>
                <input  {...nameRef} type='text' />
                {errors.name && <div>*חובה להכניס שם אירוע </div>}
                <p><strong>תאריך:</strong></p>
                <input id="dateInput"  {...dateRef} type='date' />
                {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
                <p><strong>שעה:</strong></p>
                <input id="timeInput"  {...hourRef} type='time' />
                {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
                <p><strong>פרטי האירוע:</strong></p>
                <textarea className='form-control w-80' {...descriptionRef}></textarea>
                {errors.description && <div>חובה להכניס תאור*</div>}
                <button  className="button-56" >פרסום האירוע</button>
            </form>
        </>
    )
}

export default NewEvent