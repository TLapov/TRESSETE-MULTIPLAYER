import { Cards } from "../config/cards";
import { CustomSocket } from "../config/types";

export class GameService {
    players: CustomSocket[];
    deck = new Cards().deck();
    cardsLeft: any[];
    socketPlayes: CustomSocket;
    socketPlayes2: CustomSocket;
    
    constructor(players:  CustomSocket[]) {
        this.players = players;
        this.players[0].emit('deck-cards', [...this.deck.slice(0,5), ...this.deck.slice(10, 15)]);
        this.players[1].emit('deck-cards', [...this.deck.slice(5,10), ...this.deck.slice(15, 20)]);
        this.cardsLeft = this.deck.slice(20);
        this.socketPlayes = players[0];
        this.socketPlayes2 = this.getPlayer2();
        this.socketPlayes.on('socket-card', this.getCards);
    }

    getCards = (card1: any) => {
        if(card1) {
            this.socketPlayes?.off('socket-card', this.getCards);
            this.socketPlayes2.once('socket-card', (card2) => {
               this.checkResult(card1, card2);
            });
        }
    }

    checkResult(card1: any, card2: any) {
        if(card1.strength < card2.strength) {
            const socket = this.players.find(player => player.id === this.socketPlayes.id) as CustomSocket;
            socket.points = socket.points + (card1.value + card2.value);
            this.socketPlayes = socket;
        }else {
            const socket = this.players.find(player => player.id === this.socketPlayes2.id) as CustomSocket;
            socket.points = socket.points + (card1.value + card2.value);
            this.socketPlayes = socket;
            this.socketPlayes2 = this.getPlayer2();
        }
        this.sendMsg(`${this.socketPlayes.username} is win, he/she/it plays`);
        this.socketPlayes.emit('send-card', this.cardsLeft[0]);
        this.socketPlayes2.emit('send-card', this.cardsLeft[1]);
        this.cardsLeft.splice(0, 2);
        this.socketPlayes.on('socket-card', this.getCards);
    }

    private getPlayer2(): CustomSocket {
        return this.players.find(player => player.id !== this.socketPlayes?.id) as CustomSocket
    }

    private sendMsg(msg: any): void {
        this.players.forEach(player => {
            player.emit('game-msg', msg)
        })
    }

}