const express = require('express');
const { isAuthenticated, isAuthorized } = require('../Authentication/auth');
const { getAllPeople, getPersonByID, createPerson, updatePersonByID, deletePersonByID, loginPerson,logout } = require('../controllers/peopleController');
const peopleRouter = express.Router();

peopleRouter.route("/people").get(getAllPeople);
peopleRouter.route("/people/:id").get(getPersonByID);
peopleRouter.route("/people").post(createPerson);
peopleRouter.route("/people/:id").put(updatePersonByID);
peopleRouter.route("/people/:id").delete(deletePersonByID);

// for showing authentication requirements
peopleRouter.route("/auth/login").post(loginPerson);
peopleRouter.route('/auth/logout').get(logout);

// Only authenticated person can access this route.
peopleRouter.route('/auth/isAuthenticated').get(isAuthenticated,(req,res) => {res.json({success: true,message: "Yes, Given request is from authenticated person"})});

// Only authorized person can access this route.
peopleRouter.route('/auth/isAuthorized').get(isAuthenticated,isAuthorized(["admin"]), (req, res) => { res.json({ success: true, message: `Yes, Given request is from authorized role` }) });


module.exports = peopleRouter;