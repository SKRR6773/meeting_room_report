const express = require('express');
const my_controller = require('../controllers/meeting_topics.controller');
const first_mid = require('../middleware/first.middleware');

const route = express.Router();

route.post('/get_all_topics', my_controller.GetAllTopic);
route.post('/get_topic_detail', my_controller.GetTopicDetails);
route.post('/chk_empcode_can_create_topic', my_controller.EmployeeCanCreateTopicWithEmployeeCode);
route.post('/get_all_room', my_controller.GetAllRoom);
route.post('/create_topic', my_controller.CreateTopic);
route.post('/get_report_of_topic', first_mid, my_controller.GetReportOfTopic);
route.post('/get_report_all_topics', my_controller.GetReportAllTopics);

module.exports = route;