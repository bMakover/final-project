// SignUp.js
import React, { useState } from 'react';
import { apiService } from '../services/apiService ';
import { useForm } from 'react-hook-form';
import GoogleMaps from './Demo';


const SignUp = () => {
  const { postData } = apiService();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const fullNameRef = register("fullName", { required: true, minLength: 4, type: Date })
  const emailRef = register("email", { required: true, minLength: 10 })
  const phoneRef = register("phone", { minLength: 10, required: true })
  const passwordRef = register("password", { required: true, minLength: 1 })
  const imageRef = register("image", { required: true, minLength: 1 })
  const [check, setCheck] = useState(true)
  const carDescription_brandRef = register("brand", { minLength: 4, type: Date })
  const carDescription_colorRef = register("color", { minLength: 4 })
  const carDescription_seatsNumberRef = register("seatsNumber", { minLength: 1 })
  let locationObj = {}
  let pickUpLocationOBJ = {}
  let defaultDestinationObj = {}


  const onSub = async (databody) => {
    if (check == false) {
      databody.carDescription.color = null
      databody.carDescription.brand = null
      databody.carDescription.seatsNumber = null
    }
    let obj = {
      fullName: databody.fullName,
      email: databody.email,
      phone: databody.phone,
      password: databody.password,
      image: databody.image,
      location: locationObj,
      defaultDestination: defaultDestinationObj,
      travels: [],
      waits: [],
      demands: [],
      carDescription: {
        brand: databody.brand,
        color: databody.color,
        seatsNumber: databody.seatsNumber
      },
      pickUpLocation: pickUpLocationOBJ
      ,
      isDriver: check,
      isActive: true,
      dateCreated: new Date(Date.now()),
      role: "user"

    }
    try {
      console.log(obj)
      // await postData("users", formData); // Assuming 'users' is the endpoint you want to hit
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
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
    pickUpLocationOBJ = handleSourceSelect(obj)
    console.log(pickUpLocationOBJ)
  }
  return (<>
    <form onSubmit={handleSubmit(onSub)}>
      <label>
        שם מלא:
        <input type="text" {...fullNameRef} />
      </label>

      <label>
        אימייל:
        <input type="email" {...emailRef} />
      </label>

      <label>
        טלפון:
        <input type="tel" {...phoneRef} />
      </label>

      <label>
        סיסמא:
        <input type="password" {...passwordRef} />
      </label>

      <label>
        תמונת פרופיל:
        <input type="text" {...imageRef} />
      </label>

      <label>
        האם אתה נהג?
        <input type="checkbox" defaultChecked={true} onChange={() => { setCheck(!check) }} />
      </label>

      {
        check &&
        <div>
          <label>
            סוג הרכב:
            <input type="text" name="brand" {...carDescription_brandRef} />
          </label>

          <label>
            צבע רכב:
            <input type="text" {...carDescription_colorRef} />
          </label>

          <label>
            כמות מושבים:
            <input type="number" {...carDescription_seatsNumberRef} />
          </label>
        </div>
      }

      <button>הרשמה</button>
    </form>
    <label>מיקום</label>
    <GoogleMaps id="1" onInput={handelSRC} />
    <label>מיקום ברירת מחדל לפוסטים</label>
    <GoogleMaps id="2" onInput={handelDefDes} />
    <label>נקודת מפגש</label>
    <GoogleMaps id="3" onInput={handelPickUp} />
  </>
  );
};

export default SignUp;
