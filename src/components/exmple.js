import React from 'react'
import GoogleMaps from './Demo'

const Exmple = () => {

    const handleSourceSelect = (obj) => {
        const parts = obj?.description.split(', ');
        if (parts != undefined) {
            // המספר בית יהיה המספר הראשון שמופיע בקטע שבו יש מספרים
            const houseNumber = parts?.find(part => /\d+/.test(part));
            const street = parts[1];
            const city = parts[2];

            const addressObject = {
                city,
                street,
                houseNumber
            };

            console.log(addressObject);
        }
    }
    return (
        <>

            <GoogleMaps onInput={handleSourceSelect} /></>
    )
}

export default Exmple