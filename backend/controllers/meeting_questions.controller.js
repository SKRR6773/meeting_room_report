const my_services = require('../services/meeting_questions.service');
const { responseEnd } = require('../lib/modules');


let error = [];
let warning = [];
let succ = [];
let data = [];

module.exports = new class {
    async GetAllQuestions(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];


            // console.log("Request => ");
            // console.log(req.socket_io.io.emit("message", "Hello"));

            let response_binding = {};


            if (!(await my_services.GetAll(response_binding)))
            {
                error.push("get all questions service error #1");
            }
            else
            {
                if (response_binding.value)
                {
                    data.push(response_binding.value);
                    succ.push("get all questions successfully!");
                }
                else
                {
                    error.push("something failed, can't get all questions!");
                }
            }


            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("meeting questions Get All Questions Controller Error -> ");
            console.error(err);

            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};