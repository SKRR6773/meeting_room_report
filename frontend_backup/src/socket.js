import { io } from 'socket.io-client';


const socket = io();


socket.on('connect', () => {
    console.log("Connected to server!");
});


socket.on('message', (msg) => {
    // alert(msg);
    console.log(msg);
});