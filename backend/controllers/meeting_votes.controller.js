const my_service = require('../services/meeting_votes.service');
const { sequelize } = require('../models/config');
const meeting_topics_service = require('../services/meeting_topics.service');
const meeting_questions_service = require('../services/meeting_questions.service');
const meeting_votes_service = require('../services/meeting_votes.service');
const meeting_vote_histories_service = require('../services/meeting_vote_histories.service');
const { responseEnd } = require('../lib/modules');


let error = [];
let warning = [];
let succ = [];
let data = [];

module.exports = new class {

    async VoteTopic(req, res)
    {
        try
        {
            error = [];
            warning = [];
            succ = [];
            data = [];


            const { topic_id, values } = req.body;
            const values_load = JSON.parse(values);
            const transaction = await sequelize.transaction();


            if (!(await meeting_topics_service.TopicIdIsExists(topic_id)))
            {
                error.push("You Topic Vote Not Found #1");
            }
            else
            {
                if ((await meeting_topics_service.IsTopicClosedWithTopicId(topic_id)))
                {
                    error.push("แบบประเมินที่คุณกำลังโหวตพึ่งจะจบไปเมื่อสักครู่...");
                }
                else
                {
                    let all_question_id = [];
                    let response_binding = {};
    
                    if (!(await meeting_questions_service.GetAll(response_binding)))
                    {
                        error.push("Some Service Failed, Please Contact To Deverlopper!");
                    }
                    else
                    {
                        if (response_binding.value)
                        {
                            all_question_id = response_binding.value.map((row) => row.id);
                        }
                        else
                        {
                            error.push("#MQS Service Binding Failed!");
                        }
                    }
    
                    if (all_question_id.length !== values_load.length)
                    {
                        error.push("current your old version or something your request error!");
                    }
                    else
                    {
                        const all_values_id = values_load.map((row) => row.questionId);
    
                        if (all_question_id.filter((row) => {
                            return !all_values_id.includes(row);
                        }).length > 0)
                        {
                            // errors
                            error.push("Bad Your Request #2");
                        }
                        else
                        {
                            // posible score is 1 - 5
            
                            if (values_load.filter((row) => {
                                const score_parsed = Number.parseInt(row.score);
            
                                return !(all_question_id.includes(row.questionId) && (score_parsed > 0 && score_parsed < 6));
                            }).length > 0)
                            {
                                // errors 
                                error.push("Bad Your Request #1");
                            }
                            else
                            {
                                // success
                                console.log("Success");
    
    
    
                                console.log(topic_id);
                                console.log(values_load);
    
                                const vote_id = await meeting_votes_service.AddVoteTransaction(transaction, topic_id);
    
    
                                if (!vote_id)
                                {
                                    error.push("Can't Vote, Please Contract Programmer Or Deverlopper project!");
                                }
                                else
                                {
                                    let is_error = false;
                                    await Promise.all(values_load.map(async (row) => {
                                        if (is_error) return;
        
                                        if (!(await meeting_vote_histories_service.AddVoteHistory(row.score, row.questionId, vote_id)))
                                        {
                                            error.push("Something Question can't insert score!");
                                            is_error = true;
                                        }
                                    }));
                                }
                            }
                        }
                    }
                }
            }
            
            
            
            // finally
            if (error.length === 0)
            {
                try
                {
                    await transaction.commit();
                    succ.push("เพิ่มการโหวตของคุณสำเร็จแล้ว");


                    if (!(await meeting_topics_service.UpdateTopicStatusWithTopicId(topic_id)))
                    {
                        warning.push("Please Contract Programmer Or Devolopper #UPDATE_TOPIC_ERR_1");
                    }
                }   
                catch (err)
                {
                    error.push("เกิดข้อผิดพลาดบางอย่าง #commit_err");
                    console.error(err);
                }
            }
            else
            {
                try
                {
                    await transaction.rollback();
                    error.push("การโหวตของคุณไม่สำเร็จ");
                }
                catch (err)
                {
                    error.push("เกิดข้อผิดพลาดร้ายแรง # rollback_err");
                    console.error(err);
                }
            }

            return res.status(200).json(responseEnd(error, warning, succ, data));
        }
        catch (err)
        {
            console.log("Meeting Votes Vote Topic Controller Error -> ");
            console.error(err);


            return res.status(500).json(responseEnd(error, warning, succ, data));
        }
    }
};