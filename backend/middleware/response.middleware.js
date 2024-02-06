const { responseEnd } = require('../lib/modules');


module.exports = (status_code=200) => 
{
    return (req, res) => res.status(status_code).json(responseEnd(req.error, req.warning, req.succ, req.data));
}