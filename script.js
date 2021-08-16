'use strict';

const tempDescription = document.querySelector('.temp__description');
const tempDegreesNumber = document.querySelector('.temp__degrees--degrees');
const timeZone = document.querySelector('.location__time-zone');
const weatherIcon = document.querySelector('.icon');
const tempDegreesSection = document.querySelector('.temp');
const tempDegreesUnit = document.querySelector('.temp__degrees--unit');

let long;
let lat;
let tempUnit;

const getWeatherInfo = unit => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      tempUnit = unit;
      const apiKey = '8ba00cef15bbdac711803f2efdc73947';
      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${tempUnit}&appid=${apiKey}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let { temp } = data.main;
          const { description, icon } = data.weather[0];

          // Add DOM elements from API
          console.log(data);

          tempDegreesNumber.innerHTML = `${Math.round(
            temp
          )} <span class="temp__degrees--unit">C</span>`;
          tempDescription.textContent =
            description.charAt(0).toUpperCase() + description.slice(1);
          timeZone.textContent = data.name;
          weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description} icon">`;
        });
    });
  }
};

window.addEventListener('load', () => {
  getWeatherInfo('metric');
});

// Changing between Celcius & Fahrenheit
tempDegreesSection.addEventListener('click', () => {
  if (tempUnit === 'metric') {
    getWeatherInfo('imperial');
  } else {
    getWeatherInfo('metric');
  }
});
