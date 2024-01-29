const { sequelize } = require('../models/config');
const { QueryTypes } = require('sequelize');
const meeting_rooms_model = require('../models/meeting_room.model');


module.exports = new class {
    constructor()
    {
        console.log("Hello World!");


        (async () => {
            console.log((await this.GetRoomNameWithRoomId(1)));
        })();
    }


    async GetRoomNameWithRoomId(room_id)
    {
        try
        {
            const response = await sequelize.query(`
                SELECT name FROM meeting_rooms WHERE id = :room_id
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    room_id
                }
            });

            return response.length === 1 ? response[0].name : false;
        }
        catch (err)
        {
            console.log("Meeting Rooms Get Room Name With Room Id Service Error -> ");
            console.error(err);


            return false;
        }
    }
};