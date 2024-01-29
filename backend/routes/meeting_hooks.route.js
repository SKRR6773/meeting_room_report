const express = require('express');
const my_controller = require('../controllers/meeting_hooks.controller');

const route = express.Router();

route.post('/push', my_controller.PushTopic);


module.exports = route;