const user_roles_service = require('./user_role.service');
const jwt_conv_lang = require('../data/jwt_conv_lang.json');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



module.exports = new class {
    constructor()
    {
        this.JWT = fs.readFileSync(path.join(__dirname, '..', '__secret__', 'jwt.key'));
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    }

    CreateToken(data={})
    {
        return jwt.sign(data, this.JWT, {
            expiresIn: this.JWT_EXPIRES_IN
        });
    }

    VerifyToken(token)
    {
        try
        {
            return [true, jwt.verify(token, this.JWT)];
        }
        catch (err)
        {
            if (err instanceof jwt.JsonWebTokenError)
            {
                return [false, this.ConvertErrMessage(err.message)];
            }

            return [false, "somthing failed!"];
        }
    }

    ConvertErrMessage(message)
    {
        return message in jwt_conv_lang ? jwt_conv_lang[message] : message;
    }
};
