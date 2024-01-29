// meeting report app

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// socket.io require
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


const IP = process.env.IP;
const PORT = process.env.PORT;
const LIMIT_FILE_UPLOAD = Number.parseInt(process.env.LIMIT_FILE_UPLOAD);


// configure
app.use(cors({
    origin: [
        'http://localhost:5173'
    ]
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    limits: LIMIT_FILE_UPLOAD
}));



// routing . import
const debugRouting = require('./routes/debug.route');
const meetingQuestionRouting = require('./routes/meeting_questions.route');
const meetingHooksRouting = require('./routes/meeting_hooks.route');
const meetingTopicRouting = require('./routes/meeting_topics.route');
const meetingVotesRouting = require('./routes/meeting_votes.route');
const employeeRouting = require('./routes/employee.route');
const authRouting = require('./routes/auth.route');

// routing . use
app.use('/debug', debugRouting);
app.use('/meeting_question', meetingQuestionRouting);
app.use('/meeting_hooks', meetingHooksRouting);
app.use('/meeting_topic', meetingTopicRouting);
app.use('/meeting_votes', meetingVotesRouting);
app.use('/employee', employeeRouting);
app.use('/auth', authRouting);

// socket server config
const SocketServe = require('./socket_serve/socket_serve');
new SocketServe(io);



require('./models/sync').sync({alter: true, force: false}).then(() => {

    server.listen(PORT, IP, () => {
        console.log(`Listener Server on ${IP}:${PORT}`);
    });

}).catch((err) => {
    console.error(err);
    process.exit(0);
});