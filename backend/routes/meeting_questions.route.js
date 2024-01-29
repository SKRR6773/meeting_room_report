const express = require('express');
const my_controllers = require('../controllers/meeting_questions.controller');


const route = express.Router();

route.post('/get_questions', my_controllers.GetAllQuestions);


module.exports = route;