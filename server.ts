import http from 'node:http';
import { Server, Socket } from 'socket.io';
import app from './src/app';
import { HOST, PORT } from './src/config/constants';

interface CustomSocket extends Socket {
    username?: string;
}

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket: CustomSocket) => {
    socket.on('set-username', (username: string) => {
        let existUsername = false;
        io.sockets.sockets.forEach((s: CustomSocket) => {
            if(s.username === username) {
                existUsername = true;
            }
        });
        if(existUsername) {
            socket.emit('response-username', `${username} is already exsist.`, existUsername);
        }else {
            socket.username = username;
            socket.emit('response-username', `${socket.username} is created!`);
            socket.emit('rooms-list', getActiveRooms());
        }
    });
    
    socket.on('create-room', (room) => {
        const roomExsist = getActiveRooms().find(r => r === room);
        if(roomExsist) {
            socket.emit('response-room', `${room} already exsist`, roomExsist);
        }else {
            socket.join(room);
            io.emit('rooms-list', getActiveRooms());
            socket.emit('response-room', `${room} is created!`);
        }
    });

    socket.on('join-room', (room) => {
        const roomSize: number = io.sockets.adapter.rooms.get(room)?.size || 0;
        if(roomSize > 2) {
            socket.emit('response-join', `${room} is full!`);
        }else {
            socket.join(room);
            socket.emit('response-join', `User ${socket.username} is join to ${room} room`)
        }

    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.username);
    });
})


function getActiveRooms(): Array<string> {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter((room: any) => !room[1].has(room[0]));
    // Return only the room name: 
    // ==> ['room1', 'room2']
    const res: Array<string> = filtered.map((i:any) => i[0]);
    
    return res;
}

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});


// io.sockets.adapter.rooms.delete(socket.id);
// io.sockets.adapter.rooms.set(username, new Set(username));
// console.log(io.sockets.adapter.rooms);

// io.sockets.adapter.rooms.get(socket.id)?.clear();
// io.sockets.adapter.rooms.get(socket.id)?.add(username);
// console.log(io.sockets.adapter.rooms);