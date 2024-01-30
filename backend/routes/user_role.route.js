const express = require('express');
const my_controller = require('../controllers/user_roles.controller');


const route = express.Router();


route.get('/get_all_roles', my_controller.GetAllRoles);
route.post('/create', my_controller.CreateUser);


module.exports = route;