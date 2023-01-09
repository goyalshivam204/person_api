const Person = require("../models/personModel");


// This API used to retrieve all the people from the database.
exports.getAllPeople = async (req,res) => {
    try{
        const people = await Person.find({});
        res.status(200).json({ success: true, message: "People Retrieved Successfully !", data: people });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }

}

// This API used to retrieve the person with the given ID
exports.getPersonByID = async (req,res) => {
    try {
        const id = req.params.id;
        const person = await Person.findById(id);
        if(!person){
            res.status(200).json({ success: false, message: "Person with given id not found!"});
        }else{
            res.status(200).json({ success: true, message: "Person Retrieved Successfully", data: person });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
   
}

// This API is used to create a new person with given person data
exports.createPerson = async (req,res) => {
    try{
        const personData = req.body;
        const person = new Person(personData);
        console.log(person);
        await person.save();
        res.status(200).json({ success: true, message: "Person Created Successfully !!!" });
    }catch(err){
        res.status(400).json({success: false, message: err.message});
    }
  
}


// This API used to update details of a given person (identified by id).
exports.updatePersonByID = async (req,res) => {
    try {
        const id = req.params.id;
        const personData = req.body;
        const person = await Person.findByIdAndUpdate(id,personData);
        if (!person) {
            res.status(200).json({ success: false, message: "Person with given id not found!" });
        } else {            
            res.status(200).json({ success: true, message: "Person Updated Successfully"});
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

    
    
}

// This API used to delete the given person (identified by id)
exports.deletePersonByID = async (req,res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id);
        if (!person) {
            res.status(200).json({ success: false, message: "Person with given id not found!" });
        } else {
            res.status(200).json({ success: true, message: "Person Deleted Successfully" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

// for showing the authentication functionalities

exports.loginPerson = async (req, res, next) => {

    try{
        const { email, password } = req.body;

        // checking if user has given password and email both
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'please Enter email or password' });
            return;
        }
        const person = await Person.findOne({ email }).select("+password");

        if (!person) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }

        const isPasswordMatched = await person.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }


        const token = person.getJWTToken();

        // option for cookie
        console.log(process.env.COOKIE_EXPIRE)
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
            httpOnly: true
        }

        res.status(200).cookie('token', token, options).json({
            success: true,
            message: "logged in successfully",
        });
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
};


exports.logout = async (req, res, next) => {
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })
    }catch(err){
        res.status(err.statusCode || 400).json({success: false,message: err.message});
    }
   
};



