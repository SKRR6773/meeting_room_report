const express = require('express');
const my_controller = require('../controllers/employee.controller');


const route = express.Router();


route.post('/getEmpDetailsByEmpCode', my_controller.GetEmpDetailsWithEmpCode);


module.exports = route;