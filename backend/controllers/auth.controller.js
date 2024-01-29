const my_service = require('../services/auth.service');
const authorization_modules = require('../lib/authorization.module');
const { responseEnd } = require('../lib/modules');


let error = [];
let warning = [];
let succ = [];
let data = [];


module.exports = new class {
    async VerifyMyToken(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            const { token } = req.body;


            const [metadata, msg] = authorization_modules.VerifyToken(token);


            if (metadata)
            {
                const { EmployeeCode, EmployeePassword } = msg;
                const [metadata, response_data] = await my_service.GetEmployeeDetailsTokenWithEmployeeCodeAndEmployeePassword(EmployeeCode, EmployeePassword);


                succ.push("it your token seem still perfect!");
                data.push(response_data);
            }
            else
            {
                error.push(msg);
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }


    async Login(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            const { empcode, emppassword } = req.body;

            const [metadata, _data] = await my_service.GetEmployeeDetailsTokenWithEmployeeCodeAndEmployeePassword(empcode, emppassword);

            if (metadata)
            {
                data.push(_data);
                succ.push("Login Successfully!");
            }   
            else
            {
                error.push(_data);
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