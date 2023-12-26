const Try=()=>{
    const addressString = "יגאל אלון 123, תל אביב-יפו, ישראל";

    // בחילוץ שם הרחוב, מספר הבית, והעיר והמדינה באמצעות ביטויים רגולריים
    const regex = /(.+) (\d+), (.+), (.+)/;
    const match = addressString.match(regex);
    
    if (match) {
      const [, street, houseNumber, city, country] = match;
      
      const addressObject = {
        street: street,
        houseNumber: houseNumber,
        city: city,
        country: country,
      };
    
      console.log(addressObject);
    } else {
      console.error("המחרוזת אינה בפורמט תקין.");
    }
    return(
        <h1>ggg</h1>
    )
}
export default Try