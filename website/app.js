/* openweathermap */

// full url -> api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const API_key = 'c63dac31932c09755c4bd095c7c7b524';
const API_base = 'https://api.openweathermap.org/data/2.5/weather?'


/* Global Variables */
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const country = document.getElementById('country');
const generate = document.getElementById('generate');
const userData = {};
let errors = '';

console.log(zipCode.value, country.value, feelings.value);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}  .  ${d.getDate()}  .  ${d.getFullYear()}`;


const postData = async (url = '', data = {}) => {
    console.log(data);
    // post data
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// inputs validation before fetching temprature data from openweathermap api
const checkInvalidity = () => {
    const invalid_zipCode = zipCode.value == '' || isNaN(Number(zipCode.value));
    const invalid_feeling = feelings.value.trim().length < 3;
    const ivalid_countryCode = (country.value.trim().length != 2 || country.value.match(/[0-9]/g) != null);

    // validation casses 
    // wrong zip code or empty, invalid country code or empty and empty feelings
    // wrong zip code, invalid country code or empty and valid feelings
    // valid zip code, invalid country code or empty and empty feelings
    // wrong zip code or empty, valid country code and feelings
    // invalid  country code , valid zip code and feelings
    // invalid  feelings , valid  country codezip code
    // valid zip code and feelings

    if (invalid_feeling && ivalid_countryCode && (invalid_zipCode)) {
        errors = 'Please add a valid zip/postal code number, two letters country code and describe your feeling';
        console.log(errors)
    } else if ((invalid_zipCode) && ivalid_countryCode) {
        errors = 'Please enter a valid zip/postal code number andtwo letters country code';
        console.log(errors)
    } else if (invalid_feeling && ivalid_countryCode) {
        errors = 'Please describe your feeling and add two letters country code';
        console.log(errors)
    } else if ((invalid_zipCode)) {
        errors = 'Please enter a valid zip/postal code number';
        console.log(errors)
    } else if (ivalid_countryCode) {
        errors = 'Please enter a valid two letters country code';
        console.log(errors)
    } else if (invalid_feeling) {
        errors = 'Please describe your feeling';
        console.log(errors)
    } else {
        errors = '';
    }
}

// fetching temprature data from openweathermap api
const getWeatherData = async (url = '', data = {}) => {

    // inputs validation before fetching temprature data from openweathermap api
    checkInvalidity();

    // if all inputs data are valid > fetching temprature data
    if (errors == '') {
        
        const Full_URL = `${API_base}zip=${zipCode.value},${(country.value).toLowerCase()}&appid=${API_key}`;
       
        const response = await fetch(Full_URL);

        try {
            const newData = await response.json();
            console.log(newData);

             // set the input data to post them
            userData.zipCode = zipCode.value;
            userData.country = country.value;
            userData.feelings = feelings.value;
            userData.temperature = `${(newData.main.temp - 273.15).toFixed(1)} °C`;
            userData.date = newDate;

            console.log(userData);
            // post data to server
            postData('/projectData', userData);

            return newData;

        } catch (error) {
            console.log("error", error);
        }
    }
}

// inputs click event
generate.addEventListener('click', getWeatherData)