const { sequelize } = require('../models/config');
const { QueryTypes } = require('sequelize');
const meeting_vote_histories_model = require('../models/meeting_vote_history.model');



module.exports = new class {
    async AddVoteHistory(score=1, question_id, vote_id)
    {
        try
        {
            await sequelize.query(`
                INSERT INTO meeting_vote_histories(score, question_id, vote_id) VALUES (:score, :question_id, :vote_id)
            `, {
                type: QueryTypes.INSERT,
                replacements: {
                    score,
                    question_id,
                    vote_id
                }
            });

            return true;
        }
        catch (err)
        {
            console.log("Meeting Vote Histories Add Vote History Error -> ");
            console.error(err);


            return false;
        }
    }
};