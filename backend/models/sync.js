const { sequelize } = require('./config');
require('./meeting_room.model');
require('./meeting_topic.model');
require('./meeting_questions.model');
require('./meeting_vote.model');
require('./meeting_vote_history.model');
require('./meeting_topic_status.model');
require('./user_role.model');


module.exports = sequelize;