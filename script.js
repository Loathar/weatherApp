// Declaring variables
let timeZone = document.querySelector(".location-timezone");
const degree = document.querySelector(".degree");
const description = document.querySelector(".description");
const weatherImg = document.querySelector(".weatherImg");

// Variables for latitude and longitude.
let lat;
let long;
// Checking if user has location enabled. Then sets long and lat to users position
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    long = position.coords.longitude;
    lat = position.coords.latitude;

    // API call to weatherapi.com
    const api = `http://api.weatherapi.com/v1/current.json?key=c25ca954233347eb897165445220904&q=${lat},${long}&aqi=no
      `;
    console.log(api);
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Desctructing temp_c and text, icon from condition.data.current.
        const {
          temp_c,
          condition: { text, icon },
        } = data.current;

        // Destructing region and country from data.location
        const { region, country } = data.location;
        //   console.log(region, country);
        // Uppdating the dom elements
        timeZone.innerHTML = `${region}, ${country}`;
        degree.textContent = temp_c;
        description.textContent = text;
        weatherImg.src = icon;
      })
      .error((e) => {
        console.log("Error", e);
      });
  });
}
