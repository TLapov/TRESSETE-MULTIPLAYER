import { Server } from "socket.io";
import { CustomSocket } from "../config/types";
import { SocketService } from "../services/socket.service";

export class SocketController {
    socket: CustomSocket;
    service: SocketService;

    constructor(io: Server, socket: CustomSocket) {
        this.socket = socket;
        this.service = new SocketService(io, socket);
        
        this.socket.on('set-username', this.service.createUsername);
        this.socket.on('create-room', this.service.createRoom);
        this.socket.on('join-room', this.service.joinRoom);
        this.socket.on('disconnected', this.service.disconnect);
        this.socket.on('start-game', this.service.startGame);
    }
}