import React from 'react'

export const validateDate = (date, time) => {
    console.log(date)
    console.log(time)
    const inputDate = date;
    let parts = inputDate.split('-');
    let now = new Date();
    let year = parseInt(parts[0], 10);
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    currentMonth += currentMonth + 1
    let currentDay = now.getDate();
    let month = (parts[1][0] === '0') ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
    let day = (parts[2][0] === '0') ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10);
    console.log(currentDay + " " + currentMonth + " " + currentYear)
    if (year == currentYear) {
        if (month == currentMonth) {
            if (day >= currentDay) {
                if (day == currentDay) {
                    return validateDateTime(time)
                }
                else return true
            }
            else {
                alert("יום שגוי")
                return false
            }
        }
        else if (month > currentMonth) { return true }
        else {
            alert("חודש שגוי")
            return false
        }
    }
    else if (year > currentYear) { return true }
    else {
        alert("שנה שגויה")

        return false
    }
};
const validateDateTime = (time) => {
    const inputTime = time;
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
    console.log("ggggggg")
    if (inputTime >= currentTime) {
        alert('התאריך והשעה חוקיים.');
        return true
    } else {
        alert('השעה עברה כבר. אנא בחר שעה חדשה.');
        return false
    }

}


