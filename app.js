// window.addEventListener('load', () => {
//     let long;
//     let lat;
//     let temperatureDescription = document.querySelector('.temperature-description');
//     let temperatureDegree = document.querySelector('.temperature-degree');
//     let locationTimezone = document.querySelector('.location-timezone');
//     let weatherIcon = document.querySelector('.icon');
//
//     const temperatureSection = document.querySelector('.temperature');
//     const temperatureSpan = document.querySelector('.temperature span');
//
//
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             long  = position.coords.longitude;
//             lat = position.coords.latitude;
//
//             const apiKey = '2a2530d9dd09d906d9cd0f3ad691d9ab';
//
//             const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
//
//             fetch(api)
//             .then(response => {
//                 return response.json();
//             })
//
//             .then(data => {
//                 const temp = data.main.temp
//                 const weatherDescription = data.weather[0].description;
//                 const timeZone = data.name
//                 const icon = data.weather[0].icon
//
//                 const imgURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
//
//                 // Set DOM Elements from the API
//
//                 temperatureDegree.textContent = temp;
//                 temperatureDescription.textContent = weatherDescription;
//                 locationTimezone.textContent = timeZone;
//                 weatherIcon.setAttribute('src', imgURL);
//
//                 //Formula for celsius
//
//                 let celcius = (temp - 32) * (5 / 9);
//
//                 //Change temp degree celcius to fahrenheit
//
//                 temperatureSection.addEventListener('click', () => {
//                     if(temperatureSpan.textContent === 'F') {
//                         temperatureSpan.textContent = '°C';
//                         temperatureDegree.textContent = Math.floor(celcius);
//                     } else {
//                         temperatureSpan.textContent = 'F';
//                         temperatureDegree.textContent = temp;
//                     }
//
//
//                 });
//
//
//             });
//         });
//     }
//     });


    const express = require('express');
    const https = require('https');
    const app = express();

    app.use(express.static("public"));

    var bodyParser = require('body-parser')
    const btn = document.querySelector('#btn');


    app.get("/", function (req, res) {

        res.sendFile(__dirname + "/index.html");
        /*res.send('Server is up and running.') only 1 res.send in one block*/
    });


 btn.addEventListener('click', function() {

   let temperatureDescription = document.querySelector('.temperature-description');
       let temperatureDegree = document.querySelector('.temperature-degree');
       let locationTimezone = document.querySelector('.location-timezone');
       let weatherIcon = document.querySelector('.icon');

       const temperatureSection = document.querySelector('.temperature');
       const temperatureSpan = document.querySelector('.temperature span');

   app.post('/', function(req, res) {
       const query = req.body.cityName;
       const apiKey = '2a2530d9dd09d906d9cd0f3ad691d9ab';
       const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=metric';

       https.get(url, function (response) {
        console.log(response.statusCode);


        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';


            temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weatherDesc;
                locationTimezone.textContent = query;
                weatherIcon.setAttribute('src', imageURL);



            res.send();

        })
    })

   })

    })

    app.listen(3000, function(req, res) {
    console.log('server is running on port 3000')
});
