const express = require('express');
const my_controller = require('../controllers/meeting_votes.controller');


const route = express.Router();


route.post("/vote_topic", my_controller.VoteTopic);

module.exports = route;