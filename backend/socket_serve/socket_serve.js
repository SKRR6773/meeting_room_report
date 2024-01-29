const SocketRooms = {
    topics: {}
};


module.exports = class SocketServe {
    constructor(io)
    {
        this.io_serve = io;
        this.clients = [];

        io.on('connection', this.Connection.bind(this));
    }


    Connection(client)
    {
        this.clients.push(client);
        new ClientHandle(client);
    }
};



class ClientHandle
{
    constructor(socket)
    {
        this.socket = socket;
        this.clients = [];


        console.log("Client Connected!");
        // console.log(socket.request.headers);
        // socket.emit('message', "Hello, From Server!");

        socket.on('change_topic', this.OnChangeTopic.bind(this));
    }

    OnChangeTopic(topic_id)
    {
        // verify
        // ...

        if (!(SocketRooms.topics[topic_id]))
        {
            SocketRooms.topics[topic_id] = [];
        }

        const client_id = SocketRooms.topics[topic_id].length;
        SocketRooms.topics[topic_id].push({
            clientId: client_id,
            socket: this.socket
        });

        console.log(topic_id);
    }
}


class TopicHandle
{
    constructor(socket, topic_id)
    {

    }
}