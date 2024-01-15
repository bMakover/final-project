import React, { useEffect, useState } from 'react'
import { apiService } from '../services/apiService '
import { useForm } from 'react-hook-form'
import { validateDate } from './validDate'
import GoogleMaps from './Demo'
import PostsForEvents from './postsForEvents'
import { useNavigate } from 'react-router'

const SingleEvent = (props) => {
    let item = props.item
    const [date, setDate] = useState()
    const [UpdateFlag, setUpdateFlag] = useState(false)
    const [PostEventsFlag, setPOSTSEventFlag] = useState(false)
    const { methodAuthData } = apiService()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const nameRef = register("name", { required: true, minLength: 2 })
    const dateRef = register("date", { required: true, type: Date })
    const descriptionRef = register("description", { minLength: 4, required: true })
    const hourRef = register("hour", { required: true })
    let des = {}
    const nav=useNavigate()
    const onSub = async (databody) => {
        try {
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
                alert(" האירוע עודכן בהצלחה!")
            }
            else {
                alert("הכניסי כתובת שוב")
            }
        }
        catch (err) {

            alert("ישנה בעיה נסה מאוחר יותר")

        }
    }
    const daleteEvent = async () => {
        try {
            const data = await methodAuthData(`events/${item._id}`, {}, "DELETE")
            console.log(data)
            alert("האירוע נמחק בהצלחה!")
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


    const handelDES = (obj) => {
        des = handleSourceSelect(obj)
    }

    return (
        <div className=''>
                 <button className='button-89' style={{textAlign:'center'}} onClick={()=>{
                  setPOSTSEventFlag(!PostEventsFlag)
                 }}>צפייה בפוסטים לאירוע</button>
                 {PostEventsFlag&&   <PostsForEvents id={item._id}/>}
            <div className='border m-3 d-flex justify-contant-between '>
                <div>
            
                    <p><strong>שם האירוע:</strong></p>
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
                    <button className="mybtn  font-bold py-2 px-4 rounded-full" onClick={() => { daleteEvent() }} ><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button className="mybtn  font-bold py-2 px-4 rounded-full" onClick={() => {
                        setUpdateFlag(!UpdateFlag)
                    }}><i class="fa fa-pencil" aria-hidden="true"></i></button>      </div>{UpdateFlag && <div>
                        <label><strong>כתובת:</strong></label>
                        <GoogleMaps  onInput={handelDES} />
                        <form onSubmit={handleSubmit(onSub)}>
                            <label><strong>שם האירוע:</strong></label>
                            <input className='m-4 border' {...nameRef} defaultValue={item.Name} type='text' />
                            <label><strong>תאריך:</strong></label>
                            <input className='m-4 border' {...dateRef} id="dateId" defaultValue={date} type='date' />
                            <label><strong>שעה:</strong></label>
                            <input className='m-4 border'{...hourRef} id="timeId" defaultValue={item.hour} type='time' />
                            <div>
                                <label className="form-label"><strong>פרטים:</strong></label>
                                <textarea class="form-control"{...descriptionRef} defaultValue={item.description}></textarea></div>
                            <button className="button-56">עדכון </button>
                        </form>

                    </div>
                }

            </div>

        </div>
    )
}

export default SingleEvent