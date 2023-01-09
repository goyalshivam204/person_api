const express = require('express');
const { getAllPeople, getPersonByID, createPerson, updatePersonByID, deletePersonByID } = require('../controllers/peopleController');
const peopleRouter = express.Router();

peopleRouter.route("/people").get(getAllPeople);
peopleRouter.route("/people/:id").get(getPersonByID);
peopleRouter.route("/people").post(createPerson);
peopleRouter.route("/people/:id").put(updatePersonByID);
peopleRouter.route("/people/:id").delete(deletePersonByID);

module.exports = peopleRouter;