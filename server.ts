import http from 'node:http';
import { Server } from 'socket.io';
import app from './src/app';
import { HOST, PORT } from './src/config/constants';

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log(socket);
})

server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});