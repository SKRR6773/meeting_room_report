const { sequelize } = require('../models/config');
const { QueryTypes } = require('sequelize');
const meeting_votes_model = require('../models/meeting_vote.model');



module.exports = new class {
    async AddVoteTransaction(transaction, topic_id)
    {
        try
        {
            const [result, metadata] = await sequelize.query(`
                INSERT INTO meeting_votes(topic_id) VALUES (:topic_id)
            `, {
                type: QueryTypes.INSERT,
                replacements: {
                    topic_id
                },
                transaction: transaction
            });


            // console.log("Result => ");
            // console.log(result);

            // console.log("MetaData => ");
            // console.log(metadata);

            return result;
        }
        catch (err)
        {
            console.log("Meeting Votes Add Vote Transaction Service Error -> ");
            console.error(err);


            return false;
        }
    }
};