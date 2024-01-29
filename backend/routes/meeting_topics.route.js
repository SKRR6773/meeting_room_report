const express = require('express');
const my_controller = require('../controllers/meeting_topics.controller');

const route = express.Router();

route.post('/get_all_topics', my_controller.GetAllTopic);
route.post('/get_topic_detail', my_controller.GetTopicDetails);
route.post('/chk_empcode_can_create_topic', my_controller.EmployeeCanCreateTopicWithEmployeeCode);

module.exports = route;