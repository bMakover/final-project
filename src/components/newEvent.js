import React from 'react'
import { useForm } from 'react-hook-form'
import { apiService } from '../services/apiService '
import { validateDate } from './validDate'
const NewEvent = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    // const nav = useNavigate()
    const { methodAuthData } = apiService()
    const nameRef = register("name", { required: true, minLength: 2 })
    const location_cityRef = register("location_city", { required: true, minLength: 2 })
    const location_streetRef = register("location_street", { minLength: 2 })
    const location_houseNumberRef = register("location_houseNumber", { minLength: 1 })
    const dateRef = register("date", { required: true, type: Date })
    const descriptionRef = register("description", { minLength: 4, required: true })
    const hourRef = register("hour", { required: true })
    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateInput").value, document.querySelector("#timeInput").value)
        if (flag == true) {
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
                travels: [],
                dateCreated: new Date(Date.now())
            }
            await methodAuthData("events/", obj, "POST")
            console.log(obj)
            console.log(databody)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSub)}>
                <label>שם האירוע</label>
                <input  {...nameRef} type='text' />
                {errors.name && <div>*חובה להכניס עיר מקור</div>}
                <label>עיר:</label>
                <input   {...location_cityRef} type='text' />
                <label>רחוב:</label>
                <input  {...location_streetRef} type='text' />
                <label>מספר:</label>
                <input  {...location_houseNumberRef} type='text' />
                {errors.destanation_city && <div>*חובה להכניס עיר יעד</div>}
                <label>תאריך</label>
                <input id="dateInput"  {...dateRef} type='date' />
                {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
                <label >שעה:</label>
                <input id="timeInput"  {...hourRef} type='time' />
                {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
                <label>תאור האירוע</label>
                <textarea  {...descriptionRef}></textarea>
                {errors.description && <div>חובה להכניס תאור*</div>}
                <button>פרסום האירוע</button>
            </form>
        </>
    )
}

export default NewEvent