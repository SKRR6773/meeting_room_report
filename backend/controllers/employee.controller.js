const { responseEnd } = require('../lib/modules');
const employee_api = require('../apis/employee.api');


let error = [];
let warning = [];
let data = [];
let succ = [];


module.exports = new class {
    GetEmpDetailsWithEmpCode(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];


            const { empcode } = req.body;

            return employee_api.CallBackGetEmployeeDetailsWithEmployeeCode(empcode, (argvs) => {
                const { status } = argvs;

                if (status)
                {
                    data.push(argvs.data);
                    succ.push("get user details successfully!");
                }
                else
                {
                    error.push("User not found! or something error!");
                }


                return res.status(200).json(responseEnd(error, warning, succ, data));
            });          
        }
        catch (err)
        {
            console.log("Empoloyee Get Empcode Details With Empcode Controller Error -> ");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};