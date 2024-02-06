// meeting report app

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const { confirm } = require('@inquirer/prompts');



const app = express();

// socket.io require
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
// io.path("/webapi2/socket.io");


const IP = process.env.IP;
const PORT = process.env.PORT;
const LIMIT_FILE_UPLOAD = Number.parseInt(process.env.LIMIT_FILE_UPLOAD);


// configure
app.use(cors({
    origin: [
        'https://web.mrgshrimp.com', 'https://web.mrgshrimp.com/assetment_comunication/frontend/', 'https://web.mrgshrimp.com/assetment_comunication/frontend/topic'
    ]
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    limits: LIMIT_FILE_UPLOAD
}));
app.use('/public', express.static(path.join(__dirname, "public")));



// routing . import
const debugRouting = require('./routes/debug.route');
const meetingQuestionRouting = require('./routes/meeting_questions.route');
const meetingHooksRouting = require('./routes/meeting_hooks.route');
const meetingTopicRouting = require('./routes/meeting_topics.route');
const meetingVotesRouting = require('./routes/meeting_votes.route');
const employeeRouting = require('./routes/employee.route');
const authRouting = require('./routes/auth.route');
const meetingRoomsRouting = require('./routes/meeting_rooms.route');
const userRoleRouting = require('./routes/user_role.route');

// routing . use
app.use('/debug', debugRouting);
app.use('/meeting_question', meetingQuestionRouting);
app.use('/meeting_hooks', meetingHooksRouting);
app.use('/meeting_topic', meetingTopicRouting);
app.use('/meeting_votes', meetingVotesRouting);
app.use('/employee', employeeRouting);
app.use('/auth', authRouting);
app.use('/meeting_rooms', meetingRoomsRouting);
app.use('/user_roles', userRoleRouting);

// socket server config
// const SocketServe = require('./socket_serve/socket_serve');
// new SocketServe(io);



const conf_content = JSON.parse(fs.readFileSync(path.join(__dirname, "/data/first.json"), {
    encoding: "utf-8"
}));




const main = () =>
{
    require('./models/sync').sync({alter: true, force: conf_content.is_first}).then(async () => {
        if (conf_content.is_first)
        {
            try
            {
                Promise.all(fs.readFileSync(path.join(__dirname, "/data/first.sql"), {
                    encoding: 'utf-8'
                }).split('\n').map(async (row) => {
                    return await require('./models/config').sequelize.query(
                        row  
                    , {
                        type: QueryTypes.INSERT
                    });
                }));
    
                conf_content.is_first = false;
    
                fs.writeFileSync(path.join(__dirname, "/data/first.json"), JSON.stringify(conf_content, null, 4), {
                    encoding: 'utf-8'
                });
            }
            catch (err)
            {
                console.error(err);
            }
        }
    
        server.listen(PORT, IP, () => {
            console.log(`Listener Server on ${IP}:${PORT}`);
        });
    
    }).catch((err) => {
        console.error(err);
        process.exit(0);
    });
}

if (conf_content.is_first)
{
    console.log("This is an actual run on production, the first time will be a force run, **WARNING, you will not be able to roll back after the run has started.");
    confirm({
        message: " if you press y for DELETE ALL DATA and n for stop."
    }).then((value) => {
    
        if (value)
        {
            main();
        }
    });
}
else
{
    main();
}