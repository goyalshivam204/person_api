const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// Importing People Router
const peopleRouter = require("./routes/peopleRoute");

app.use(express.json());
// for post requests parsing data
//-------------------------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Using People Router
app.use("/api", peopleRouter);


module.exports = app