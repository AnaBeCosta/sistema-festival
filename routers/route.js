const express = require('express');
const controller = require('../controllers/controller');
const route = express.Router();

module.exports = route;

//Votar
route.get("/", controller.getVotos)
route.post("/votar", controller.postVoto);
