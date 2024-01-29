const axios = require('axios');

module.exports = new class {
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
}