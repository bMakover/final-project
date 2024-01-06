import React, { useContext, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';
import GoogleMaps from "./Demo";


function UserEditProfile() {
  const { methodAuthData } = apiService()
  const [check, setCheck] = useState(false)
  let locationObj = {}
  let pickUpLocationOBJ = " "
  let defaultDestinationObj = {}
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    image: '',
    location: {
      city: '',
      street: '',
      houseNumber: '',
    },
    defaultDestination: {
      city: '',
      street: '',
      houseNumber: '',
    },
    isDriver: false,
    carDescription: {
      brand: '',
      color: '',
      seatsNumber: '',
    },
    pickUpLocation: '',
  });
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const fullNameRef = register("fullName", { minLength: 2, defaultValues: formData.fullName })
  const emailRef = register("email", { minLength: 2, defaultValues: formData.email })
  const phoneRef = register("phone", { minLength: 6, defaultValues: formData.phone })
  const passwordRef = register("password", { defaultValue: formData.password })
  const imageRef = register("image", { defaultValues: formData.image })
  const brandRef = register("brand", { defaultValues: formData.carDescription.brand })
  const colorRef = register("color", { defaultValues: formData.carDescription.color })
  const seatsNumberRef = register("seatsNumber", { defaultValues: formData.carDescription.seatsNumber })

  useEffect(() => {
    fetchUserData();
  }, []);

  let userData
  const fetchUserData = async () => {
    try {
      const response = await methodAuthData('users/myInfo', {}, 'GET');
      userData = response.data;
      console.log(userData); // Add this line to inspect the structure
      setFormData(userData);
      setCheck(userData.isDriver)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };



  const handleSourceSelect = (obj) => {
    const parts = obj?.description.split(', ');
    console.log(parts)
    if (parts != undefined) {
      // המספר בית יהיה המספר הראשון שמופיע בקטע שבו יש מספרים
      const houseNumber = " "
      let street = parts[parts.length - 3];
      let city = parts[parts.length - 2];
      if (/\d+/.test(city)) {
        street = parts[0]
        city = parts[1]
      }
      if (street == undefined)
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
    locationObj = handleSourceSelect(obj)
    console.log(locationObj)
  }
  const handelDefDes = (obj) => {
    defaultDestinationObj = handleSourceSelect(obj)
    console.log(defaultDestinationObj)
  }
  const handelPickUp = (obj) => {
    pickUpLocationOBJ = obj.description
    console.log(pickUpLocationOBJ)
  }
  const onSub = async (databody) => {
    if (defaultDestinationObj.city && locationObj.city && pickUpLocationOBJ != " ") {
      const obj = {
        fullName: databody.fullName || formData.fullName,
        email: databody.email || formData.email,
        phone: databody.phone || formData.phone,
        password: databody.password,
        location: locationObj,
        defaultDestination: defaultDestinationObj,
        isDriver: check,
        carDescription: {
          brand: databody.brand || null,
          color: databody.color || null,
          seatsNumber: databody.seatsNumber || null
        },
        pickUpLocation: pickUpLocationOBJ,
      };

      await methodAuthData(`users/${formData._id}`, obj, "PUT");
      console.log(obj);
      alert("הנתונים התעדכנו בהצלחה!")
    }
    else {
      alert("הכניסי כתובות תחילה!")
    }
  }


  return (

    <div className="d-flex justify-content-between">{console.log(formData)}
      <form className="col-md-3 d-inline-block myHorizentalForm  shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSub)}>
        {/* Render form fields using controlled components */}

        <div className="flex m-3  items-center border-b border-black-500 py-2"><i class="fa fa-user" aria-hidden="true"></i>
          <label>
            שם מלא:
            <input className="myFiled  appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="text" {...fullNameRef} defaultValue={formData.fullName} />
          </label>
        </div>
        {errors.fullName && <p>*חובה להכניס שם </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-envelope-o" aria-hidden="true"></i>  אימייל:
            <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="email"  {...emailRef} defaultValue={formData.email} />
          </label></div>
        {errors.email && <p>*חובה להכניס אימייל </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-phone-square" aria-hidden="true"></i> טלפון:
            <input type="tel" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none"  {...phoneRef} defaultValue={formData.phone} />
          </label>
        </div>   {errors.phone && <p>*חובה להכניס טלפון </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-unlock-alt" aria-hidden="true"></i>    סיסמא:
            <input type="password" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none"  {...passwordRef} defaultValue={formData.password} />
          </label>
          {errors.password && <p>*חובה להכניס סיסמא </p>}
        </div>
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-picture-o" aria-hidden="true"></i>  תמונה:</label>
          <input type="text" name="image" {...imageRef} /></div>
        <label>
          האם את נהגת?
          {check ? <i class="fa fa-toggle-on" aria-hidden="true" onClick={() => { setCheck(false) }}></i> : <i class="fa fa-toggle-off" aria-hidden="true" onClick={() => { setCheck(true) }}></i>}
        </label>

        {check == true &&
          <div>
            <div className="flex m-3 items-center border-b border-black-500 py-2">
              <label>
              <i class="fa fa-car" aria-hidden="true"></i>     חברת הרכב:
                <input type="text" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" defaultValue={formData.carDescription?.brand} {...brandRef} />
              </label>
            </div>
            <div className="flex m-3 items-center border-b border-black-500 py-2">
              <label>
              <i class="fa fa-paint-brush" aria-hidden="true"></i>   צבע הרכב:
                <input type="text" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" defaultValue={formData.carDescription?.color} {...colorRef} />
              </label>
            </div>
            <div className="flex m-3 items-center border-b border-black-500 py-2">
              <label>
              <i class="fa fa-users" aria-hidden="true"></i>     כמות מושבים:
                <input type="number" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" defaultValue={formData.carDescription?.seatsNumber} {...seatsNumberRef} />
              </label></div>
          </div>
        }

        <button className="d-block mybtn text-white font-bold py-2 px-4 rounded-full m-3"  >עדכן</button>
      </form>


      <div style={{ height: '400px' }} className="col-md-4 ms-4  myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4">    <h2>כתובות:</h2>
        <p className="text-danger">מלאי כתובות אלו לפני לחיצה על העידכון!</p>
        <br></br>
        <br></br>
        <label>מיקום</label>
        <GoogleMaps id="1" onInput={handelSRC} />
        <label>מיקום ברירת מחדל לפוסטים</label>
        <GoogleMaps id="2" onInput={handelDefDes} />
        <label>נקודת מפגש</label>
        <GoogleMaps id="3" onInput={handelPickUp} /></div>

    </div>
  );
}

export default UserEditProfile

