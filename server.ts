import http from 'node:http';
import { Server } from 'socket.io';
import app from './src/app';
import { HOST, PORT } from './src/config/constants';
import { SocketController } from './src/controllers/socket.controller';
import { CustomSocket } from './src/config/types';

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket: CustomSocket) => {
    new SocketController(io, socket);
});

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});
