const { responseEnd } = require('../lib/modules');
const { VerifyToken } = require('../lib/authorization.module');

let error = [];
let warning = [];
let succ = [];
let data = [];

module.exports = new class {
    First(req, res, next)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];


            if ("token" in req.headers)
            {
                const user_details = VerifyToken(req.headers.token);
                req.user_details = user_details;

                return next();
            }
            else
            {
                error.push("Somthing error, please contact deverlopper! #bind token");
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            error.push("Something error in first middleware!");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }


    PermissionIn(...permits)
    {
        return (req, res, next) => 
        {
            try
            {
                error = [];
                warning = [];
                succ = [];
                data = [];

                const user_details = req.header.user_details;

                if (!permits.includes(user_details.role))
                {
                    error.push("คุณไม่มีสิทธิ์ในการดำเนินการนี้");
                }
                else
                {
                    return next();
                }


                return res.status(200).json(responseEnd(error, warning, succ, data));
            }
            catch (err)
            {
                return res.status(500).json(responseEnd(error, warning, succ, data));
            }
        };
    }
};