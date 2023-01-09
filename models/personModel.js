const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


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
    }, 
    password: {
        type: String,
        required: [true, "Please Enter Your password"],
        minLength: [8, "password Length must be greater than 8"],
        select: false
    },
    role: {
        type: String,
        default: "person"
    }
});


// can't use arrow function because we need to access this keyword
personSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10,)
})


// for creation of jwt token only will be created if user is validated
personSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


personSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const personModel = mongoose.model("person", personSchema, "people");
module.exports = personModel;