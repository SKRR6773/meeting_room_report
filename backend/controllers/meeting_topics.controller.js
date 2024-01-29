const my_service = require('../services/meeting_topics.service');
const { responseEnd } = require('../lib/modules');
const user_roles_service = require('../services/user_role.service');


let error = [];
let warning = [];
let succ = [];
let data = [];

module.exports = new class {
    async GetAllTopic(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            let response_binding = {};

            if (!(await my_service.GetAllTopics(response_binding)))
            {
                error.push("Service Get Topics Data Error!");
            }
            else
            {
                if (response_binding.value)
                {
                    data.push(response_binding.value.map((row) => {

                        row.is_closed = row.voted_count >= row.people_count;
                        row.progress_simple_text = `${row.voted_count}/${row.people_count}`;

                        return row;
                    }));
                    succ.push("Get All Topics Success!");
                }
                else
                {
                    error.push("Something failed, can't binding data!");
                }
            }


            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("meeting topics Get All Topics Controller Error -> ");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }


    async GetTopicDetails(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];



            const { topic_id } = req.body;

            
            if (!(await my_service.TopicIdIsExists(topic_id, )))
            {
                error.push("Service For Check Topic Exists Error #1");
            }
            else
            {
                let response_binding = {};


                if (!(await my_service.GetWithTopicId(topic_id, response_binding)))
                {
                    error.push("service for get topic details error #1");
                }
                else
                {
                    if (response_binding.value)
                    {
                        data.push(response_binding.value[0]);
                        succ.push("get topic details successfully!");
                    }
                    else
                    {
                        error.push("Something failed, can't to get topic details #2");
                    }
                }
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("Meeting Topic Get Topic Details Controller Error -> ");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }



    async EmployeeCanCreateTopicWithEmployeeCode(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];

            const { empcode } = req.body;


            if (!(await user_roles_service.IsEmployeeCodeAllowedCreateTopic(empcode)))
            {
                error.push(`employee ${empcode} is permission denied!`);
            }
            else
            {
                succ.push("Yes, your can create the topic!");
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};