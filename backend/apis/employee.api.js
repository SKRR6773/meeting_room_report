const axios = require('axios');

module.exports = new class Employee {
    CallBackGetEmployeeDetailsWithEmployeeCode(empcode, cb)
    {
        try
        {
            axios.post(process.env.ERP_URL + "/employee/get_EmployeeAndUsername", {
                empcode: empcode
            }, ).then((response) => {
                try
                {
                    if (response.data.length === 1)
                    {
                        return cb({status: true, data: response.data.map((row) => {
                            const {
                                E_ImagePath, EmployeeCode, LocalFirstName, LocalLastName, E_IsActive
                            } = row;

                            return {
                                E_ImagePath, EmployeeCode, LocalFirstName, LocalLastName, E_IsActive
                            }
                        })[0]});
                    }
                    else
                    {
                        return cb({status: false});
                    }
                }
                catch (err)
                {
                    return cb({status: false});
                }
            }).catch((err) => {
                console.error(err);
                
                return cb({status: false})
            });
        }
        catch (err)
        {
            console.error(err);


            return cb({
                status: false
            });
        }
    }


    async AsyncGetEmployeeDetailsWithEmployeeCodeAndEmployeePassword(empcode, emppassword)
    {
        try
        {
            const _result = await axios.post(
                process.env.ERP_URL + "/employee/get_EmployeeAndUsername",
                {
                    empcode
                }
            );
            
            const err_message = "Username or Password Invalid!";

            if (_result.data.length === 1)
            {
                if (_result.data[0].EmployeePassword === emppassword)
                {
                    return [true, _result.data[0]];
                }
                else
                {
                    return [false, err_message];
                }
            }
            else return [false, err_message];
        }
        catch (err)
        {
            console.error(err);


            return [false, "something error!"];
        }
    }


    FilterEmployeeDetails(emp_details)
    {
        const {
            E_ImagePath, EmployeeCode, LocalFirstName, LocalLastName, E_IsActive
        } = emp_details;

        return {
            E_ImagePath, EmployeeCode, LocalFirstName, LocalLastName, E_IsActive
        };
    }


    async AsyncEmployeeIsExistsWithEmployeeCode(empcode)
    {
        try
        {
            return await new Promise((resolve, reject) => {
                this.CallBackGetEmployeeDetailsWithEmployeeCode(empcode, ({ status }) => {
                    resolve(status);
                });
            });
        }
        catch (err)
        {
            console.log("Async Employee Is Exists With Employee Code Error -> ");
            console.error(err);


            return false;
        }
    }
};