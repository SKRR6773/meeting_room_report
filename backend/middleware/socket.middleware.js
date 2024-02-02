module.exports = (io) => 
{
    return (req, res, next) => 
    {
        req.socket_io = {
            io: io
        };

        return next();
    }
};