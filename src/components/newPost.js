import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';
import { validateDate } from './validDate'
import GoogleMaps from './Demo';

const NewPost = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    // const nav = useNavigate()
    let src = {}
    let des = {}
    const { methodAuthData } = apiService()
    const departure_dateRef = register("departure_date", { required: true, minLength: 4, type: Date })
    const departure_hourRef = register("departure_hour", { required: true, minLength: 4 })
    const descriptionRef = register("discription", { minLength: 4, required: true })
    const seatSCountRef = register("seatSCount", { required: true, minLength: 1 })


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
    const handelDES = (obj) => {
        des = handleSourceSelect(obj)
    }

    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateInput").value, document.querySelector("#timeInput").value)
        if (flag == true&&src.city!=" "&&des.city!=" ") {
            const obj = {
                isDisplay: true,
                source: src,
                destination: des,
                description: databody.discription,
                seatsCount: Number(databody.seatSCount),
                passengersList: [],
                waitingList: [],
                updateDate: null,
                departure: {
                    date: new Date(databody.departure_date),
                    hour: databody.departure_hour
                },
                idDriver: null,
                createDate: new Date(Date.now())
            }
            await methodAuthData("posts/", obj, "POST")
            console.log(obj)
        }
    }
    return (<>
        <form onSubmit={handleSubmit(onSub)}>
            <label>מקור הנסיעה:</label>
            <label>זמן יציאה:</label>
            <label>תאריך</label>
            <input id="dateInput"  {...departure_dateRef} type='date' />
            {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
            <label >שעה:</label>
            <input id="timeInput"  {...departure_hourRef} type='time' />
            {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
            <label>כמות מקומות ישיבה</label>
            <input  {...seatSCountRef} type='number' />
            {errors.seatSCount && <div>חובה להכניס כמות מושבים*</div>}
            <label>תאור הפוסט</label>
            <textarea  {...descriptionRef}></textarea>
            {errors.description && <div>חובה להכניס תאור*</div>}
            <button>פרסום הפוסט</button>
        </form>

        <GoogleMaps onInput={handelSRC} />
        <GoogleMaps onInput={handelDES} />
    </>
    )
}

export default NewPost