const { responseEnd } = require('../lib/modules');
const meeting_topics_service = require('../services/meeting_topics.service');


let error = [];
let warning = [];
let succ = [];
let data = [];

module.exports = new class {
    async PushTopic(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];


            const { name, room_name, details, people_cout } = req.body;


            if (await meeting_topics_service.CreateTopic(name, room_name, details, people_cout))
            {
                succ.push("create topic successfully!");
            }
            else
            {
                error.push("Something failed, can't create topic!");
            }


            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("Meeting Hooks Push Topic Controller Error -> ");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};