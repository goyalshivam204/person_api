const mongoose = require("mongoose");
const validator = require("validator");

const personSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please, Enter Your first name"],
        maxLength: [15, "First Name can't exceed 15 character"],
        minLength: [3, "First Name Should have more than 3 character"]
    },
    last_name: {
        type: String,
        required: [true, "Please, Enter Your last name"],
        maxLength: [15, "Last Name can't exceed 15 character"],
        minLength: [3, "Last Name Should have more than 3 character"]
    },
    email: {
        type: String,
        required: [true, "Please, Enter Your email"],
        unique: true,
        validate: [validator.isEmail, "Please, Enter a valid email"]
    },
    age:{
        type: Number,
        required: [true, "Please, Enter Your age"]
    }
});


const personModel = mongoose.model("person", personSchema, "people");
module.exports = personModel;