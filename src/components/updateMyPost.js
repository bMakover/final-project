import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import { useForm } from 'react-hook-form'
import GoogleMaps from './Demo'
import { validateDate } from './validDate'
import { useParams } from 'react-router'

const UpdateMyPost = ({ item }) => {


    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [date, setDate] = useState()
    let src = {}
    let des = {}
    const { methodAuthData, getData } = apiService()
    const departure_dateRef = register("departure_date", { required: true, minLength: 4, type: Date })
    const departure_hourRef = register("departure_hour", { required: true, minLength: 4 })
    const descriptionRef = register("discription", { minLength: 4, required: true })
    const seatSCountRef = register("seatSCount", { required: true, minLength: 1 })
    useEffect(() => {
        let d = new Date(item.departure.date)
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

    const handelSRC = (obj) => {
        src = handleSourceSelect(obj)
    }
    const handelDES = (obj) => {
        des = handleSourceSelect(obj)
    }

    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateInput").value, document.querySelector("#timeInput").value)
        if (flag == true && src.city && des.city) {
            const obj = {
                isDisplay: true || item.isDisplay,
                source: src || item.source,
                destination: des || item.source,
                description: databody.discription || item.discription,
                seatsCount: Number(databody.seatSCount) || item.seatsCount,
                passengersList: item.passengersList,
                waitingList: item.waitingList,
                updateDate: new Date(Date.now()),
                departure: {
                    date: new Date(databody.departure_date) || item.departure.date,
                    hour: databody.departure_hour || item.departure.hour
                },
                idDriver: item.idDriver,
                createDate: item.createDate
            }
            let data = await methodAuthData(`posts/${item._id}`, obj, "PUT")
            console.log(data)
        }
        else{
            alert("הכניסי כתובות שוב!")
        }
    }


    return (<>
        <form onSubmit={handleSubmit(onSub)}>
            <label>מקור הנסיעה:</label>
            <label>זמן יציאה:</label>
            <label>תאריך</label>
            <input id="dateInput" defaultValue={date}  {...departure_dateRef} type='date' />
            {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
            <label >שעה:</label>
            <input id="timeInput" defaultValue={item.departure.hour} {...departure_hourRef} type='time' />
            {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
            <label>כמות מקומות ישיבה</label>
            <input defaultValue={item.seatsCount} {...seatSCountRef} type='number' />
            {errors.seatSCount && <div>חובה להכניס כמות מושבים*</div>}
            <label>תאור הפוסט</label>
            <textarea defaultValue={item.description}  {...descriptionRef}></textarea>
            {errors.description && <div>חובה להכניס תאור*</div>}
            <button  className="mybtn text-white font-bold py-2 px-4 rounded-full">עידכון הפוסט</button>
        </form>
        <GoogleMaps onInput={handelSRC} />
        <GoogleMaps onInput={handelDES} />
    </>
    )
}

export default UpdateMyPost