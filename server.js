// import app file from app
const app = require("./app.js");
const connectDatabase = require("./config/connectDatabase");
const dotenv = require("dotenv");


// Using custom environment file
dotenv.config({ path: "./config/config.env" });

// connecting database
connectDatabase();

// Server start listening at PORT
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})



