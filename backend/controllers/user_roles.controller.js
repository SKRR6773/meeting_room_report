const my_service = require('../services/user_role.service');
const { responseEnd } = require('../lib/modules');
const employee_api = require('../apis/employee.api');


let error = [];
let warning = [];
let data = [];
let succ = [];



module.exports = new class {
    async GetAllRoles(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            let response_binding = {};

            if (!(await my_service.GetAllRoles(response_binding)))
            {
                error.push("Something error, get all roles failed #1");
            }
            else
            {
                if (response_binding.value)
                {
                    data.push(response_binding.value);
                    succ.push("get all roles successfully!");
                }
                else
                {
                    error.push("Something error, get all roles failed #2");
                }
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }



    async CreateUser(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            const { empcode, role_name } = req.body;


            if (!(await employee_api.AsyncEmployeeIsExistsWithEmployeeCode(empcode)))
            {
                error.push("Employee not found!");
            }   
            else
            {
                // check role name is exsts 
                if (!(await my_service.IsUserRoleNameIsExists(role_name)))
                {
                    error.push("Role name not exists!");
                }
                else
                {
                    let response_binding = {};


                    if (!(await my_service.IsUserCodeIsExists(empcode, response_binding)))
                    {
                        error.push("Check User Code Is Exists Service Error");
                    }
                    else
                    {
                        // user is exists -> update
                        if (response_binding.value)
                        {
                            if ((await my_service.UpdateUserRoleWithEmpcodeAndRoleName(empcode, role_name)))
                            {
                                succ.push("update user role name successfully!");
                            }
                            else
                            {
                                error.push("update user role name failed!");
                            }
                        }
                        else // create user new role
                        {
                            if ((await my_service.CreateUserRoleWithEmpcodeAndRoleName(empcode, role_name)))
                            {
                                succ.push("create user role name successfully!");
                            }
                            else
                            {
                                error.push("create user role name failed!");
                            }
                        }
                    }
                }
            }


            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};