import React, { useContext, useRef, useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiService } from '../services/apiService ';


function UserEditProfile() {
    const { methodAuthData } = apiService()

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
      const phoneRef = register("phone", { required: true , minLength: 6})
      const passwordRef = register("password", { required: true, })
      const imageRef = register("image")
      const cityLocationRef = register("city1", { required: true,})
      const streetLocationRef = register("street1", { required: true, })
      const houseNumberLocationRef = register("houseNumber1",{ required: true, })
      const cityPickRef = register("city2")
      const streetPickRef = register("street2")
      const houseNumberPickRef = register("houseNumber2")
      const isDriverRef = register("isDriver",)
      const brandRef = register("brand", )
      const colorRef = register("color", )
      const seatsNumberRef = register("seatsNumber", )
      const pickUpLocationRef = register("pickUpLocation", )

    useEffect(() => {
        fetchUserData();
      }, []);
    
      const fetchUserData = async () => {
        try {
            const response = await methodAuthData('users/myInfo', {}, 'GET');
            const userData = response.data;
            console.log(userData); // Add this line to inspect the structure
            setFormData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    const onSub = async (databody) => {
        const obj = {
            fullName: databody.fullName,
            email: databody.email,
            phone: databody.phone,
            password: databody.password,
            location: {
                city: databody.city1,
                street: databody.street1, // Fixed typo here
                houseNumber: databody.houseNumber1
            },
            defaultDestination: {
                city: databody.city2,
                street: databody.street2,
                houseNumber: databody.houseNumber2
            },
            isDriver: databody.isDriver,
            carDescription: {
                brand: databody.brand,
                color: databody.color,
                seatsNumber: databody.seatsNumber
            },
            pickUpLocation: databody.pickUpLocation,
        };
    
        await methodAuthData(`users/${formData._id}`, obj, "PUT");
        console.log(obj);
    }
    

    return (<>
        <form onSubmit={handleSubmit(onSub)}>
          {/* Render form fields using controlled components */}
          <label>
            Full Name:
            <input type="text" {...fullNameRef} name="fullName" defaultValue={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}   required />
          </label>
    
          <label>
            Email:
            <input type="email" name="email" {...emailRef} defaultValue={formData.email}  required />
          </label>
    
          <label>
            Phone:
            <input type="tel" name="phone" {...phoneRef} defaultValue={formData.phone}  required />
          </label>
    
          <label>
            Password:
            <input type="password" name="password" {...passwordRef} defaultValue={formData.password} required />
          </label>
    
          <label>
            Image:
            <input type="text" name="image" {...imageRef} />
          </label>
    
          <label>
            Location City:
            <input type="text" name="city" {...cityLocationRef} defaultValue={formData.location?.city || ''} />     
          </label>
    
          <label>
            Location Street:
            <input type="text" name="street" {...streetLocationRef}  defaultValue={formData.location?.street}  />
          </label>
    
          <label>
            Location House Number:
            <input type="text" name="houseNumber" {...houseNumberLocationRef} defaultValue={formData.location?.houseNumber} />
          </label>
    
          <label>
            Default Destination City:
            <input type="text" name="city" {...cityPickRef}defaultValue={formData.defaultDestination?.city}  />
          </label>
    
          <label>
            Default Destination Street:
            <input type="text" name="street" {...streetPickRef} defaultValue={formData.defaultDestination?.street} />
          </label>
    
          <label>
            Default Destination House Number:
            <input type="text" name="houseNumber" {...houseNumberPickRef} defaultValue={formData.defaultDestination?.houseNumber}  />
          </label>
    
          <label>
            Is Driver:
            <input type="checkbox" name="isDriver" {...isDriverRef} defaultChecked={formData.isDriver}  />
          </label>
    
          {formData.isDriver && (
            <div>
              <label>
                Car Brand:
                <input type="text" name="brand" defaultValue={formData.carDescription?.brand} {...brandRef} />
              </label>
    
              <label>
                Car Color:
                <input type="text" name="color" defaultValue={formData.carDescription?.color} {...colorRef} />
              </label>
    
              <label>
                Number of Seats:
                <input type="number" name="seatsNumber" defaultValue={formData.carDescription?.seatsNumber} {...seatsNumberRef} />
              </label>
    
              <label>
                Pick-Up Location:
                <input type="text" name="pickUpLocation" defaultValue={formData.pickUpLocation} {...pickUpLocationRef} />
              </label>
            </div>
          )}
    
    <button type="submit">Change</button>
        </form>
        </>
      );
}

export default UserEditProfile

