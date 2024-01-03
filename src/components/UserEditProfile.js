import React, { useContext, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';
import GoogleMaps from "./Demo";


function UserEditProfile() {
  const { methodAuthData } = apiService()
  const [check, setCheck] = useState(true)
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
  const fullNameRef = register("fullName", { required: true, minLength: 2 })
  const emailRef = register("email", { required: true, minLength: 2 })
  const phoneRef = register("phone", { required: true, minLength: 6 })
  const passwordRef = register("password", { required: true, })
  const imageRef = register("image")
  const cityLocationRef = register("city1", { required: true, })
  const streetLocationRef = register("street1", { required: true, })
  const houseNumberLocationRef = register("houseNumber1", { required: true, })
  const cityPickRef = register("city2")
  const streetPickRef = register("street2")
  const houseNumberPickRef = register("houseNumber2")
  const isDriverRef = register("isDriver",)
  const brandRef = register("brand",)
  const colorRef = register("color",)
  const seatsNumberRef = register("seatsNumber",)
  const pickUpLocationRef = register("pickUpLocation",)

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await methodAuthData('users/myInfo', {}, 'GET');
      const userData = response.data;
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
        fullName: databody.fullName,
        email: databody.email,
        phone: databody.phone,
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


  return (<>
    <form className="col-md-3 myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSub)}>
      {/* Render form fields using controlled components */}
      <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-user" aria-hidden="true"></i>
        <label>
          שם מלא:
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="text" {...fullNameRef} name="fullName" defaultValue={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
        </label>
      </div>

      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label>
          אימייל:
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="email" name="email" {...emailRef} defaultValue={formData.email} required />
        </label></div>
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label>
          טלפון:
          <input type="tel" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="phone" {...phoneRef} defaultValue={formData.phone} required />
        </label>
      </div>
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label>
          סיסמא:
          <input type="password" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="password" {...passwordRef} defaultValue={formData.password} required />
        </label>
      </div>
      <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label>
          תמונה:</label>
        <input type="text" name="image" {...imageRef} /></div>
      <label>
        האם את נהגת?
        {check ? <i class="fa fa-toggle-on" aria-hidden="true" onClick={() => { setCheck(false) }}></i> : <i class="fa fa-toggle-off" aria-hidden="true" onClick={() => { setCheck(true) }}></i>}
      </label>

      {check && (
        <div>
          <div className="flex m-3 items-center border-b border-black-500 py-2">
            <label>
              חברת הרכב:
              <input type="text" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="brand" defaultValue={formData.carDescription?.brand} {...brandRef} />
            </label>
          </div>
          <div className="flex m-3 items-center border-b border-black-500 py-2">
            <label>
              צבע הרכב:
              <input type="text" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="color" defaultValue={formData.carDescription?.color} {...colorRef} />
            </label>
          </div>
          <div className="flex m-3 items-center border-b border-black-500 py-2">
            <label>
              כמות מושבים:
              <input type="number" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="seatsNumber" defaultValue={formData.carDescription?.seatsNumber} {...seatsNumberRef} />
            </label></div>
        </div>
      )}

      <button  className="d-block mybtn text-white font-bold py-2 px-4 rounded-full m-3"  type="submit">עדכן</button>
    </form>


    <div style={{ height: '400px' }} className="col-md-4  myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4">    <h2>כתובות:</h2>
      <p className="text-danger">מלאי כתובות אלו לפני לחיצה על העידכון!</p>
      <br></br>
      <br></br>
      <label>מיקום</label>
      <GoogleMaps id="1" onInput={handelSRC} />
      <label>מיקום ברירת מחדל לפוסטים</label>
      <GoogleMaps id="2" onInput={handelDefDes} />
      <label>נקודת מפגש</label>
      <GoogleMaps id="3" onInput={handelPickUp} /></div>

  </>
  );
}

export default UserEditProfile

