const express = require('express');
const my_controller = require('../controllers/meeting_rooms.controller');


const route = express.Router()


route.post('/create', my_controller.Create);


module.exports = route;