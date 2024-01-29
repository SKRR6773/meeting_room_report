const express = require('express');


const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).end("Hello 'World!");
});

route.post('/test_call', (req, res) => {
    console.log(req.files);

    const body = req.body;

    // body.values = JSON.parse(body.values);

    return res.status(200).json({
        body: body,
        files: req.files
    });
});


module.exports = route;