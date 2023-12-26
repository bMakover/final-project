import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';


const NewPost = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    // const nav = useNavigate()
    const { methodAuthData } = apiService()
    const source_cityRef = register("source_city", { required: true, minLength: 2 })
    const destanation_cityRef = register("destanation_city", { required: true, minLength: 2 })
    const source_streetRef = register("source_street", { minLength: 2 })
    const destanation_streetRef = register("destanation_street", { minLength: 2 })
    const destanation_houseNumberRef = register("destanation_houseNumber", { minLength: 1 })
    const source_houseNumberRef = register("source_houseNumber", { minLength: 1 })
    const departure_dateRef = register("departure_date", { required: true, minLength: 4, type: Date })
    const departure_hourRef = register("departure_hour", { required: true, minLength: 4 })
    const descriptionRef = register("discription", { minLength: 4, required: true })
    const seatSCountRef = register("seatSCount", { required: true, minLength: 1 })

    const validateDate = () => {  
        const inputDate = document.getElementById('dateInput').value;      
        let parts = inputDate.split('-');
        let now = new Date();
        let year = parseInt(parts[0], 10);
        let currentYear = now.getFullYear();
        let currentMonth = now.getMonth();
        let currentDay = now.getDate();
        let month = (parts[1][0] === '0') ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
        let day = (parts[2][0] === '0') ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10);

        if (year >= currentYear) {
            if (month >= currentMonth) {
                if (day >= currentDay) {
                    if (day == currentDay) {
                        validateDateTime()
                    }
                }
                else {
                    alert("יום שגוי")
                }
            }
            else {
                alert("חודש שגויה")
            }
        }
        else {
            alert("שנה שגויה")
        }
    };
    const validateDateTime = () => {
        const inputTime = document.getElementById('timeInput').value;
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

        if (inputTime > currentTime) {
            alert('התאריך והשעה חוקיים.');
        } else {
            alert('השעה עברה כבר. אנא בחר שעה חדשה.');
        }

    }


    const onSub = async (databody) => {
        validateDate()

        const obj = {
            isDisplay: true,
            source: {
                city: databody.source_city,
                street: databody.source_street,
                houseNumber: databody.source_houseNumber
            },
            destination: {
                city: databody.destanation_city,
                street: databody.destanation_street,
                houseNumber: databody.destanation_houseNumber
            },
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
    return (<>
        <form onSubmit={handleSubmit(onSub)}>
            <label>מקור הנסיעה:</label>
            <label>עיר</label>
            <input  {...source_cityRef} type='text' />
            {errors.source_city && <div>*חובה להכניס עיר מקור</div>}
            <label>רחוב:</label>
            <input   {...source_streetRef} type='text' />
            <label>מספר בית:</label>
            <input  {...source_houseNumberRef} type='text' />
            <label>יעד הנסיעה:</label>
            <label>עיר:</label>
            <input  {...destanation_cityRef} type='text' />
            {errors.destanation_city && <div>*חובה להכניס עיר יעד</div>}
            <label>רחוב:</label>
            <input  {...destanation_streetRef} type='text' />
            <label>מספר בית:</label>
            <input   {...destanation_houseNumberRef} type='text' />
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
    </>
    )
}

export default NewPost