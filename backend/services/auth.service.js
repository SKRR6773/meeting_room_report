const employee_api = require('../apis/employee.api');
const authorization_modules = require('../lib/authorization.module');
const user_roles_service = require('./user_role.service');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



module.exports = new class {
    async GetEmployeeDetailsTokenWithEmployeeCodeAndEmployeePassword(empcode, emppassword)
    {
        try
        {
            const [metadata, data] = await employee_api.AsyncGetEmployeeDetailsWithEmployeeCodeAndEmployeePassword(empcode, emppassword);


            if (metadata)
            {
                const user_role = await user_roles_service.GetUserRoleWithEmployeeCode(data.EmployeeCode);
                const token_response = authorization_modules.CreateToken({...data, role: user_role});
                return [true, {
                    token: token_response,
                    data: {...employee_api.FilterEmployeeDetails(data), role: user_role}
                }];
            }
            else
            {
                return [false, data];
            }
        }
        catch (err)
        {
            return [false, data];
        }
    }
};
