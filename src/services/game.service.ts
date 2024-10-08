import { Server } from "socket.io";
import { CustomSocket } from "../config/types";
import { Cards } from "../config/cards";

export class GameService {
    socket: CustomSocket;
    io: Server;
    players: CustomSocket[] = [];
    deck = new Cards().deck();
    cardsLeft = this.deck.slice(20);
    playerOne!: CustomSocket;
    playerTwo!: CustomSocket;

    constructor(io: Server, socket: CustomSocket){
        this.socket = socket;
        this.io = io;
    }

    public startGame = (room: string) => {
        const getRoom = this.io.sockets.adapter.rooms.get(room);
        getRoom?.forEach(id =>  {
            this.io.sockets.sockets.forEach((socket: CustomSocket) => {
                if(socket.id === id) {
                    this.players.push(socket);
                }
            })
        });
        this.playerOne = this.players[0];
        this.playerTwo = this.players[1];
        this.playerOne.emit('deck-cards', [...this.deck.slice(0,5), ...this.deck.slice(10, 15)]);
        this.playerTwo.emit('deck-cards', [...this.deck.slice(5,10), ...this.deck.slice(15, 20)]);
    }
}