import { Server } from "socket.io";
import { CustomSocket } from "../config/types";
import { Cards } from "../config/cards";
import { GameService } from "./game.service";

export class SocketService {
    socket: CustomSocket;
    io: Server;
    
    constructor(io: Server, socket: CustomSocket){
        this.socket = socket;
        this.io = io;
    }
    
    public createUsername = (username: string): void => {
        let existUsername = false;
        this.io.sockets.sockets.forEach((s: CustomSocket) => {
            if(s.username === username) {
                existUsername = true;
            }
        });
        if(existUsername) {
            this.socket.emit('response-username', `${username} is already exsist.`, existUsername);
        }else {
            this.socket.username = username;
            this.socket.emit('response-username', `${this.socket.username} is created!`);
            this.socket.emit('rooms-list', this.getActiveRooms());
        }
    }

    public createRoom = (room: string) => {
        const roomExsist = this.getActiveRooms().find(r => r === room);
        if(roomExsist) {
            this.socket.emit('response-room', `${room} already exsist`, roomExsist);
        }else {
            this.socket.join(room);
            this.io.emit('rooms-list', this.getActiveRooms());
            this.socket.emit('response-room', `${room} is created!`);
        }
    }

    public joinRoom = (room: string) => {
        const roomSize: number = this.io.sockets.adapter.rooms.get(room)?.size || 0;
        if(roomSize >= 2) {
            this.socket.emit('response-join', `${room} is full!`, true);
        }else {
            this.socket.join(room);
            this.socket.emit('response-join', `User ${this.socket.username} is join to ${room} room`);
        }
    }

    public startGame = (room: string) => {
        let players: CustomSocket[] = [];
        const r = this.io.sockets.adapter.rooms.get(room);
        r?.forEach(r =>  {
            this.io.sockets.sockets.forEach((s: CustomSocket) => {
                if(s.id === r) {
                    players.push(s);
                }
            })
        });
        new GameService(players);

        // const deckOfCards = new Cards().deck(); 
        // this.io.sockets.sockets.forEach((s: CustomSocket) => {
        //     if(s.id === players[0]) {
        //         s.emit('deck-cards', [...deckOfCards.slice(0,5), ...deckOfCards.slice(10, 15)])
        //     }
        //     if(s.id === players[1]) {
        //         s.emit('deck-cards', [...deckOfCards.slice(5,10), ...deckOfCards.slice(15, 20)])
        //     }
        // });
    }

    private getActiveRooms(): Array<string> {
        const arr = Array.from(this.io.sockets.adapter.rooms);
        const filtered = arr.filter((room: any) => !room[1].has(room[0]));
        const res: Array<string> = filtered.map((i:any) => i[0]);
        return res;
    }

    public disconnect = () => {
        console.log('User disconnected:', this.socket.username);
    }
}