const my_service = require('../services/meeting_rooms.service');
const { responseEnd } = require('../lib/modules');



let error = [];
let warning = [];
let succ = [];
let data = [];


module.exports = new class {
    async Create(req, res)
    {
        try
        {
            error = [];
            warning = [];
            data = [];
            succ = [];


            const { name } = req.body;


            let response_binding = {};

            if (!(await my_service.IsSameRoomNameAlready(name, response_binding)))
            {
                error.push("Something error, can't create meeting room service!");
            }
            else
            {
                if (!response_binding.value)
                {
                    if ((await my_service.CreateRoom(name)))
                    {
                        succ.push("Create Meeting Room Successfully!");
                    }   
                    else
                    {
                        error.push("Create Meeting Room Failed!");
                    }
                }
                else
                {
                    error.push("ชื่อห้องประชุมที่คุณจะเพิ่ม มีอยู่แล้วในระบบ");
                }
            }


            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("Meeting Room Create Controller Error ->");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};