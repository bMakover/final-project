import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';
import { validateDate } from './validDate'
import GoogleMaps from './Demo';
import { AppContext } from '../context/context'
const NewPost = ({ SetidEvent }) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    // const nav = useNavigate()
    const { MyLogUser, setMyLogUser } = useContext(AppContext);
    let src = {}
    let des = {}
    const { methodAuthData, getData } = apiService()
    const departure_dateRef = register("departure_date", { required: true, minLength: 4, type: Date })
    const departure_hourRef = register("departure_hour", { required: true, minLength: 4 })
    const descriptionRef = register("discription", { minLength: 4, required: true })
    const seatSCountRef = register("seatSCount", { required: true, minLength: 1 })

const nav =useNavigate()
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
    const handelDES = (obj) => {
        des = handleSourceSelect(obj)
    }

    const onSub = async (databody) => {
        let flag = validateDate(document.querySelector("#dateInput").value, document.querySelector("#timeInput").value)
        console.log(flag)
        if (MyLogUser.carDescription.brand == null || MyLogUser.carDescription.color == null || MyLogUser.carDescription.seatsNumber==null) {
            alert("עדכני פרטייך לנהגת")
            return
        }
        try {
            if (flag == true && src.city  && des.city) {
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
                let data = await methodAuthData("posts/", obj, "POST")
                console.log(data)
                UpdateMyPosts(data.data._id)
                if (SetidEvent)
                    SetidEvent(data.data._id)
            }
            else{
                alert("הכנסי כתובות שוב")
            }
        }
        catch (err) {
            alert("פג תוקף התחברותך התחברי שוב")
        }
    }

    const UpdateMyPosts = async (_id) => {
        try {
            let user = await methodAuthData("users/myInfoWithPass", {}, "GET")
            user = user.data
            user.myPosts.push(_id)
            console.log(user)
            const userid = user._id
            delete user._id
            delete user.__v
            delete user.password
            let data = await methodAuthData(`users/updateUserPosts/${userid}`, user, "PUT")
            console.log(data)
            alert("נוסף פוסט בהצלחה!")
            nav("/PersonalArea")
        }
        catch (err) {
            alert("עדכני פרטייך לנהגת")
        }
    }
    return (
        <div className='container border border-dark shadow px-4 my-5 bg-dark' style={{width:"fit-content", height:"fit-content"}}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'32px', marginBottom:'0px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', height: '300px' }} className="col-md-4 bg-light myform shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
              <div className="m-0 p-0">
                <label htmlFor="source">מקור הנסיעה:</label>
                <GoogleMaps onInput={handelSRC} />
              </div>
              <div className="m-0 p-0">
                <label htmlFor="destination">יעד הנסיעה:</label>
                <GoogleMaps onInput={handelDES} />
              </div>
            </div>
          </div>
      
          <div className="post-container m-0 shadowS">
            <form className="col-md-4 myform shadow-2xl rounded px-8 pt-6 pb-8 mb-4 text-light" onSubmit={handleSubmit(onSub)}>
              <label htmlFor="dateInput">זמן יציאה:</label>
              <label>תאריך</label>
              <input className="form-control w-200" id="dateInput" {...departure_dateRef} type="date" />
              {errors.departure_date && <div>חובה להכניס תאריך יציאה*</div>}
              <label htmlFor="timeInput">שעה:</label>
              <input className="form-control" id="timeInput" {...departure_hourRef} type="time" />
              {errors.departure_hour && <div>חובה להכניס שעת יציאה*</div>}
              <label htmlFor="seatCount">כמות מקומות ישיבה</label>
              <input className="form-control" id="seatCount" {...seatSCountRef} type="number" />
              {errors.seatSCount && <div>חובה להכניס כמות מושבים*</div>}
              <label htmlFor="description">תאור הפוסט</label>
              <textarea className="form-control" id="description" {...descriptionRef}></textarea>
              {errors.description && <div>חובה להכניס תאור*</div>}
              <button className="button-56 mt-4 text-center" style={{marginRight:"25%"}}>פרסום הפוסט</button>
            </form>
          </div>
        </div>
        </div>
    )
}

export default NewPost