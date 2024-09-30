import http from 'node:http';
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

server.listen(5500, () => {
    console.log('Server is listening');
});