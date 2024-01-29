const { sequelize } = require('../models/config');
const user_roles_model = require('../models/user_role.model');
const { QueryTypes } = require('sequelize');



module.exports = new class {
    async IsEmployeeCodeAllowedCreateTopic(empcode)
    {
        try
        {
            return (await sequelize.query(`
                SELECT code FROM user_roles WHERE code = :empcode AND role = 'admin'
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    empcode
                }
            })).length === 1;
        }
        catch (err)
        {
            console.error(err);

            return false;
        }
    }

    async GetUserRoleWithEmployeeCode(empcode)
    {
        try
        {
            return (await sequelize.query(`
                SELECT role FROM user_roles WHERE code = :empcode
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    empcode
                }
            }))[0].role;
        }
        catch (err)
        {
            console.error(err);


            return [false, "something error, can't get user role!"];
        }
    }
};