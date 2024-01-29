const express = require('express');
const my_controller = require('../controllers/auth.controller');


const route = express.Router();

route.post('/verify_my_token', my_controller.VerifyMyToken);
route.post('/login', my_controller.Login);

module.exports = route;