import React from 'react'

export const validateDate = (date,time) => {
    console.log(date)
    console.log(time)
        const inputDate = date;
        let parts = inputDate.split('-');
        let now = new Date();
        let year = parseInt(parts[0], 10);
        let currentYear = now.getFullYear();
        let currentMonth = now.getMonth();
        let currentDay = now.getDate();
        let month = (parts[1][0] === '0') ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
        let day = (parts[2][0] === '0') ? parseInt(parts[2][1], 10) : parseInt(parts[2], 10);

        if (year >= currentYear) {
            if (month >= currentMonth) {
                if (day >= currentDay) {
                    if (day == currentDay) {
                        validateDateTime(time)
                    }
                    else return true
                }
                else {
                    alert("יום שגוי")
                    return false
                }
            }
            else {
                alert("חודש שגויה")
                return false
            }
        }
        else {
            alert("שנה שגויה")
            return false
        }
    };
    const validateDateTime = (time) => {
        const inputTime = time;
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

        if (inputTime > currentTime) {
            alert('התאריך והשעה חוקיים.');
            return true
        } else {
            alert('השעה עברה כבר. אנא בחר שעה חדשה.');
           
            return false
        }

    }

