

module.exports = (req, res, next) => {
    req.error = [];
    req.warning = [];
    req.succ = [];
    req.data = [];

    next();
}