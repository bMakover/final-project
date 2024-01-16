import React, { useEffect, useRef, useState } from 'react'
import { apiService } from '../services/apiService '

const SearchEvents = ({ items, setData }) => {
    const [chosenOption, setChosenOption] = useState('')
    let copiedArr = [...items]
    let data = []
    const { getData } = apiService()
    let locationArr=[]
    const sortByDateDescending = (dateProperty) => {
        if (chosenOption === "1") {

            data = copiedArr.sort((a, b) => {
                const dateA = new Date(a[dateProperty]);
                const dateB = new Date(b[dateProperty]);
                return dateB.getTime() - dateA.getTime();
            });

        }
        else {
            data = copiedArr.sort((a, b) => {
                const dateA = new Date(a[dateProperty]);
                const dateB = new Date(b[dateProperty]);
                return dateA - dateB;
            });

        }
        setData(data)
    }

    useEffect(() => {
        let options = []
        for (let i = 0; i < items.length; i++) { options.push(items[i].location.city) }
        options = removeDuplicate(options)
        var selectBox = document.getElementById('rec_mode');
        if (selectBox.options.length == 0) {
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                selectBox.options.add(new Option(option, option, true));
            }
        }
    }, [items])

    const removeDuplicate = (data) => {
        return data.filter((value, index) => data.indexOf(value) == index)
    }

    const sortByLocation=async(_arg)=>{
        console.log(copiedArr)
        const allData = await getData("events/getAllEvents")
        console.log(allData)
        for(let i=0;i<allData.data.length;i++){
            if(allData.data[i].location.city==_arg){
                locationArr.push(allData.data[i])
            }
        }
        setData(locationArr)
    }
    return (
        <div className='container '>
            <div className='row justify-content-around '>     
            <select className='w-60 m-2 border  bg-black text-white p-3 ' style={{borderRadius:"10px"}} onChange={(e) => {
                setChosenOption(e.target.value)
                sortByDateDescending('Date')
            }} >
                <option >סינון לפי תאריך</option>
                <option value="1">הקרוב ביותר </option>
                <option value="2"> הרחוק ביותר</option>
            </select>
            <select className='w-60 border m-2 text-white bg-black p-3' style={{borderRadius:"10px"}} id="rec_mode" onChange={(e)=>{
                sortByLocation(e.target.value)
            }}></select>


</div>

        </div>
    )
}

export default SearchEvents