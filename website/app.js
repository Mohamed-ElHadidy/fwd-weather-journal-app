/* Global Variables */
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');
const userData = {};
let errors = '';

console.log(zipCode.value, feelings.value);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


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

// inputs click event
generate.addEventListener('click', (e) => {
    console.log(e);

    // validation casses 
    // wrong zip code or empty and empty feelings
    // wrong zip code and valid feelings
    // valid zip code and empty feelings
    // valid zip code and feelings

    if (feelings.value.trim().length < 3 && (zipCode.value == '' || isNaN(Number(zipCode.value))) ) {
        errors = 'Please add a valid zip/postal code number and describe your feeling';
        console.log(errors)
    } else if ((zipCode.value == '') || (isNaN(Number(zipCode.value)))) {
        errors = 'Please enter a valid zip/postal code number';
        console.log(errors)
    } else if (feelings.value.trim().length < 3) {
        errors = 'Please describe your feeling';
        console.log(errors)
    } else {
        // set the input data to post them
        userData.zipCode = zipCode.value;
        userData.feelings = feelings.value,

        console.log(userData);
        // post data to server
        postData('/addPost', userData);
    }

});