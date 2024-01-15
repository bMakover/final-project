import React, { useContext, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';
import GoogleMaps from "./Demo";
import Axios from "axios";
import { AppContext } from '../context/context'


function UserEditProfile() {
  const { methodAuthData } = apiService()
  const { MyLogUser, setMyLogUser } = useContext(AppContext);
  const [check, setCheck] = useState(false)
  let locationObj = {}
  let pickUpLocationOBJ = ""
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
  const passwordRef = register("password", {required:true, defaultValue: formData.password })
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

  const[formatDateImage,setFormDataImage]=useState()
 
  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
    // Update the form state with the Cloudinary image URL
    setFormDataImage(imageUrl);
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
  const onSub = async (databody) => {
    if (defaultDestinationObj.city && locationObj.city && pickUpLocationOBJ != "") {
      const obj = {
        fullName: databody.fullName || formData.fullName,
        email: databody.email || formData.email,
        phone: databody.phone || formData.phone,
        password: databody.password,
        location: locationObj,
        defaultDestination: defaultDestinationObj,
        image:formatDateImage||formData.image,
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
      setMyLogUser(obj)
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
        {errors.fullName && <p className="text-danger">*חובה להכניס שם </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-envelope-o" aria-hidden="true"></i>  אימייל:
            <input className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none" type="email"  {...emailRef} defaultValue={formData.email} />
          </label></div>
        {errors.email && <p className="text-danger">*חובה להכניס אימייל </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-phone-square" aria-hidden="true"></i> טלפון:
            <input type="tel" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none"  {...phoneRef} defaultValue={formData.phone} />
          </label>
        </div>   {errors.phone && <p className="text-danger">*חובה להכניס טלפון </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
          <label>
          <i class="fa fa-unlock-alt" aria-hidden="true"></i>    סיסמא:
            <input type="password" className="myFiled appearance-none border-none w-full text-gray-700 mr-3 py-1  px-2 leading-tight focus:outline-none"  {...passwordRef} defaultValue={formData.password} />
          </label>
        </div> 
          {errors.password && <p className="text-danger">*חובה להכניס סיסמא </p>}
        <div className="flex m-3 items-center border-b border-black-500 py-2">
        <label>
        תמונה:
        <input type="file" name="image" onChange={(e)=>{handleImageChange(e)}} />
      </label></div>
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

        <button className="button-56"  >עדכן</button>
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

