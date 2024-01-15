// SignUp.js
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService ';
import { useForm } from 'react-hook-form';
import GoogleMaps from './Demo';
import Axios from 'axios';
import { useNavigate } from 'react-router';


const SignUp = () => {
  const { postData } = apiService();
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const fullNameRef = register("fullName", { required: true, minLength: 4 })
  const emailRef = register("email", { required: true, minLength: 10 })
  const phoneRef = register("phone", { minLength: 10, required: true })
  const passwordRef = register("password", { required: true, minLength: 1 })
  // const imageRef = register("image", { required: true, minLength: 1 })
  const [check, setCheck] = useState(true)
  const carDescription_brandRef = register("brand", { minLength: 1, type: Date })
  const carDescription_colorRef = register("color", { minLength: 1 })
  const carDescription_seatsNumberRef = register("seatsNumber", { minLength: 1 })
  let locationObj = {}
  let pickUpLocationOBJ = " "
  let defaultDestinationObj = {}
  const [formatDate, setFormData] = useState()

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        // Update the form state with the Cloudinary image URL
        setFormData(imageUrl);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  const uploadImage = async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnwujnjie/image/upload';
      const uploadPreset = 'l9gnom66';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await Axios.post(cloudinaryUrl, formData);

      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        console.error('Cloudinary Response:', response);
        throw new Error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };


  const onSub = async (databody) => {

    if (defaultDestinationObj.city && locationObj.city && pickUpLocationOBJ != " ") {
      let obj = {
        fullName: databody.fullName,
        email: databody.email,
        phone: databody.phone,
        password: databody.password,
        image: formatDate || null,
        location: locationObj,
        defaultDestination: defaultDestinationObj,
        travels: [],
        waits: [],
        demands: [],
        carDescription: {
          brand: databody.brand || null,
          color: databody.color || null,
          seatsNumber: Number(databody.seatsNumber) || null
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
        let res = await postData("users", obj);
        if (res == 11000) {
          alert("רשומה כבר התחברי!")
          return
        }
        // Assuming 'users' is the endpoint you want to hit
        console.log('User registered successfully');
        nav("/login")
        alert("נרשמת בהצלחה!!")
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
    else {
      alert("!הכנס כתובות שוב  ")
    }
  }
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
  return (<div className="col-md-12 mt-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

    <form className="col-md-3 myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSub)}> <h2>פרטים אישיים:</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-user" aria-hidden="true"></i>
          <label className='m-2'>
          </label>    שם מלא:
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="fullname" type="text" {...fullNameRef} />
        </div>
        {errors.fullName && <p className='text-danger'>*חובה להכניס שם מלא. לפחות 4 תויים</p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-envelope-o" aria-hidden="true"></i>
          <label className='m-2'>
            אימייל: </label>
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" name="email" type="email" {...emailRef} />
        </div>
        {errors.email && <p className='text-danger'>*חובה להכניס  כתובת מייל. </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-phone-square" aria-hidden="true"></i>
          <label className='m-2'>
            טלפון:  </label>
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="tel" {...phoneRef} />
        </div>
        {errors.phone && <p className='text-danger'>*חובה להכניס טלפון</p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-unlock-alt" aria-hidden="true"></i>
          <label className='m-2'>
            סיסמא:</label>
          <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="password" {...passwordRef} />
        </div >
        {errors.password && <p className='text-danger'>*חובה להכניס סיסמא. לפחות 6 תויים</p>}
        <label>
          תמונה:
          <input type="file" name="image" onChange={(e) => { handleImageChange(e) }} />
        </label>
        <label>
          האם אתה נהג?
          {check ? <i class="fa fa-toggle-on" aria-hidden="true" onClick={() => { setCheck(false) }}></i> : <i class="fa fa-toggle-off" aria-hidden="true" onClick={() => { setCheck(true) }}></i>}
          {/* <input type="checkbox" defaultChecked={true} onChange={() => {  }} /> */}
        </label>
        {
          check &&
          <div>
            <div className="flex m-3 items-center border-b border-black-500 py-2"> <i class="fa fa-car" aria-hidden="true"></i>
              <label className='m-2'>
                סוג הרכב:</label>
              <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="text" name="brand" {...carDescription_brandRef} />
            </div>
            {errors.brand && <p className='text-danger'>*לפחות תו אחד</p>}
            <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-paint-brush" aria-hidden="true"></i>
              <label className='m-2'>
                צבע רכב: </label>
              <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="text" {...carDescription_colorRef} />
            </div>
            {errors.color && <p className='text-danger'>*לפחות תו אחד</p>}
            <div className="flex m-3 items-center border-b border-black-500 py-2"><i class="fa fa-users" aria-hidden="true"></i>
              <label className='m-2'>
                כמות מושבים:</label>
              <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="number" {...carDescription_seatsNumberRef} />
            </div>
            {errors.seatsNumber && <p className='text-danger'>*לפחות תו אחד</p>}
          </div>
        }

        <button className="button-56"  >הרשמה</button></div>
    </form>

    <div style={{ height: '400px' }} className="col-md-4  myform  shadow-2xl rounded px-8 pt-6 pb-8 mb-4">    <h2>כתובות:</h2>
      <p className="text-danger">מלאי כתובות אלו לפני לחיצה על ההרשמה!</p>
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
};

export default SignUp;
