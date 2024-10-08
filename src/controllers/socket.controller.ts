import { Server } from "socket.io";
import { CustomSocket } from "../config/types";
import { SocketService } from "../services/socket.service";
import { GameService } from "../services/game.service";

export class SocketController {
    socket: CustomSocket;
    roomService: SocketService;
    gameService: GameService;

    constructor(io: Server, socket: CustomSocket) {
        this.socket = socket;
        this.roomService = new SocketService(io, socket);
        this.gameService = new GameService(io, socket);

        this.socket.on('set-username', this.roomService.createUsername);
        this.socket.on('create-room', this.roomService.createRoom);
        this.socket.on('join-room', this.roomService.joinRoom);
        this.socket.on('disconnected', this.roomService.disconnect);
        this.socket.on('start-game', this.gameService.startGame);
    }
}