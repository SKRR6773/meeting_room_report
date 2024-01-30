const { sequelize } = require('../models/config');
const user_roles_model = require('../models/user_role.model');
const { QueryTypes } = require('sequelize');


const ROLES = ["admin", "user"];


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


    async IsUserRoleNameIsExists(role_name)
    {
        try
        {
            return ROLES.includes(role_name);
        }
        catch (err)
        {
            console.log("Is UserRoleNameIsExists User Role Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async GetAllRoles(response_binding)
    {
        try
        {
            response_binding.value = ROLES;

            return true;
        }
        catch (err)
        {
            console.log("Get All Role User Role Service Error ->");
            console.error(err);


            return false;
        }
    }


    async IsUserCodeIsExists(empcode, response_binding)
    {
        try
        {
            const response = await sequelize.query(`
                SELECT code FROM user_roles WHERE code = :empcode
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    empcode
                }
            });


            response_binding.value = response.length === 1;

            return true;
        }
        catch (err)
        {
            console.log("IsUserCodeIsExists Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async CreateUserRoleWithEmpcodeAndRoleName(empcode, role_name)
    {
        try
        {
            await sequelize.query(`
                INSERT INTO user_roles(code, role) VALUES (:empcode, :role_name)
            `, {
                type: QueryTypes.INSERT,
                replacements: {
                    empcode, role_name
                }
            });

            return true;
        }
        catch (err)
        {
            console.log("Create User Role With Empcode And RoleName Service Error ->");
            console.error(err);


            return false;
        }
    }


    async UpdateUserRoleWithEmpcodeAndRoleName(empcode, role_name)
    {
        try
        {
            await sequelize.query(`
                UPDATE user_roles SET role = :role_name WHERE code = :empcode
            `, {
                type: QueryTypes.UPDATE,
                replacements: {
                    empcode, role_name
                }
            });

            return true;
        }
        catch (err)
        {
            console.log("Update User Role Service Error -> ");
            console.error(err);


            return false;
        }
    }
};