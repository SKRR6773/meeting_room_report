const { sequelize } = require('../models/config');
const { QueryTypes } = require('sequelize');
const meeting_topic_modal = require('../models/meeting_topic.model');
const meeting_rooms_model = require('../models/meeting_room.model');



module.exports = new class {
    async CreateTopic(name, room_id, details, people_count)
    {
        try
        {
            const response = await meeting_topic_modal.create({
                name, 
                room_id,
                details,
                people_count
            });

            return true;
        }
        catch (err)
        {
            console.log("Meeting Topic Create Topic Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async GetWithTopicId(topic_id, bindingData={})
    {
        try
        {
            const response = await sequelize.query(`
                SELECT id, name, 
                (SELECT name FROM meeting_rooms WHERE id = meeting_topics.room_id) As room_name, 
                details, people_count, (SELECT name FROM meeting_topic_statuses WHERE id = meeting_topics.status_id) As status_name, createdAt, 
                (SELECT count(id) FROM meeting_votes WHERE topic_id = meeting_topics.id) As voted_count
                FROM meeting_topics
                WHERE id = :topic_id
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_id
                }
            });


            if (response)
            {
                bindingData.value = response;
            }

            return true;
        }
        catch (err)
        {
            console.log("Meeting Topic Get With Topic Id Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async TopicIdIsExists(topic_id)
    {
        try
        {
            return (await sequelize.query(`
                SELECT id FROM meeting_topics WHERE id = :topic_id
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_id
                }
            })).length === 1;
        }
        catch (err)
        {
            console.log("Meeting Check Topic Id Exists Service Error ->");
            console.error(err);


            return false;
        }
    }


    async GetAllTopics(bindingData={})
    {
        try
        {
            const response = await sequelize.query(`
                SELECT id, name, 
                (SELECT name FROM meeting_rooms WHERE id = meeting_topics.room_id) As room_name, 
                details, people_count, (SELECT name FROM meeting_topic_statuses WHERE id = meeting_topics.status_id) As status_name, (SELECT COUNT(*) FROM meeting_votes WHERE topic_id = meeting_topics.id) As voted_count
                FROM meeting_topics
            `, {
                type: QueryTypes.SELECT
            });

            if (response)
            {
                bindingData.value = response;
            }

            return true;
        }
        catch (err)
        {
            console.log("meeeting topics Get All Topics Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async UpdateTopicStatusWithTopicId(topic_id)
    {
        try
        {
            await sequelize.query(`
                UPDATE meeting_topics SET status_id = 2 WHERE id = :topic_id AND people_count <= (SELECT COUNT(*) FROM meeting_votes WHERE topic_id = :topic_id)
            `, {
                type: QueryTypes.UPDATE,
                replacements: {
                    topic_id
                }
            });


            return true;
        }
        catch (err)
        {
            console.log("meeting topics Update Topic With Topic Id Service Error -> ");
            console.error(err);


            return false;
        }
    }


    async IsTopicClosedWithTopicId(topic_id)
    {
        try
        {
            return (await sequelize.query(`
                SELECT id FROM meeting_topics WHERE id = :topic_id AND status_id = 2
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_id
                }
            })).length === 1;
        }
        catch (err)
        {

            return false;
        }
    }


    async IsTopicNameSameAlready(topic_name)
    {
        try
        {
            return (await sequelize.query(`
                SELECT name FROM meeting_topics WHERE name = :topic_name
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_name
                }
            })).length === 1;
        }
        catch (err)
        {
            console.error(err);


            return false;
        }
    }



    async GetTopicReportData(topic_id, response_binding)
    {
        try
        {
            const response = await sequelize.query(`
                SELECT *, vote_id FROM meeting_vote_histories WHERE vote_id IN (SELECT id FROM meeting_votes WHERE topic_id = :topic_id)
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_id
                }
            });


            if (response)
            {
                response_binding.value = response;
            }

            return true;
        }
        catch (err)
        {
            console.log("Get Topic Report Service Error ->");
            console.error(err);

            
            return false;
        }
    }



    async GetTopicVoteCount(topic_id, response_binding)
    {
        try
        {
            const response = (await sequelize.query(`
                SELECT COUNT(id) as count FROM meeting_votes WHERE topic_id = :topic_id
            `, {
                type: QueryTypes.SELECT,
                replacements: {
                    topic_id
                }
            }))[0];


            // console.log("Response => ");
            // console.log(response);

            if (response)
            {
                response_binding.value = response.count;
            }

            return true;
        }
        catch (err)
        {
            console.log("Get Topic Vote Count Service Error ->");
            console.error(err);


            return false;
        }
    }
};