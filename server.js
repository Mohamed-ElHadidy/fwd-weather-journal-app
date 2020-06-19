// Setup empty JS object to act as endpoint for all routes
projectData = {};

// openweathermap
// full url -> api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const API_key = 'c63dac31932c09755c4bd095c7c7b524';
const API_base = 'https://api.openweathermap.org/data/2.5/weather?'

const posts = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, runMyServer);

function runMyServer() {
    //console.log(server);
    console.log(`running server at port ${port}`)
}


app.post('/addPost' , (req, res) => {
    console.log(req.body);
    posts.push(req.body);
    console.log(posts);
});