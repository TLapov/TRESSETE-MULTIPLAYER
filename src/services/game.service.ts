import { Server } from "socket.io";
import { CustomSocket } from "../config/types";
import { Cards } from "../config/cards";

export class GameService {
    socket: CustomSocket;
    io: Server;
    players: CustomSocket[] = [];
    room!: string;
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
        this.room = room;
        this.playerOne = this.players[0];
        this.playerTwo = this.getPlayer2();
        this.playerOne.emit('deck-cards', [...this.deck.slice(0,5), ...this.deck.slice(10, 15)]);
        this.playerTwo.emit('deck-cards', [...this.deck.slice(5,10), ...this.deck.slice(15, 20)]);
        this.playGame();
    }

    public playGame = () => {
        this.playerOne.once('play-game', (card1, response) => {
            response();
            this.playerTwo.emit('rm-opponent-card');
            this.sendToPlayers('show-card', card1);
            this.playerTwo.once('play-game', (card2, response) => {
                response();
                this.playerOne.emit('rm-opponent-card');
                this.sendToPlayers('show-card', card2);
                this.showResult(card1, card2);
            });
        });
    }

    private showResult(card1: any, card2: any){
        if(card1.strength < card2.strength) {
            const socket = this.players.find(player => player.id === this.playerOne.id) as CustomSocket;
            this.playerOne.points = socket.points + (card1.value + card2.value);
        }else {
            const socket = this.players.find(player => player.id === this.playerTwo.id) as CustomSocket;
            socket.points = socket.points + (card1.value + card2.value);
            this.playerOne = socket;
            this.playerTwo = this.getPlayer2();
        }
        if(this.cardsLeft.length) {
            setTimeout(() => {
                this.playerOne.emit('get-card', this.cardsLeft[0]);
                this.playerTwo.emit('get-card', this.cardsLeft[1]);
                this.cardsLeft.splice(0, 2);
                this.playGame();
            }, 1500);
        }
    }

    private getPlayer2(): CustomSocket {
        return this.players.find(player => player.id !== this.playerOne?.id) as CustomSocket
    }

    private sendToPlayers(emit: string, msg: string, options?: any){
        this.io.to(this.room).emit(emit, msg, options);
    }

}