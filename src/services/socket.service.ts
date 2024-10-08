import { Server } from "socket.io";
import { CustomSocket } from "../config/types";

export class SocketService {
    socket: CustomSocket;
    io: Server;
    
    constructor(io: Server, socket: CustomSocket){
        this.socket = socket;
        this.io = io;
    }
    
    public createUsername = (username: string, response: Function) => {
        if(this.checkUsername(username)) {
            response({ sucess: false, msg: `${username} is already exsist.`});
        }else {
            this.socket.username = username;
            response({ success: true, msg: `${this.socket.username} is created!`});
            this.socket.emit('rooms-list', this.getActiveRooms());
        }
    }

    public createRoom = (room: string, response: Function) => {
        const roomExsist = this.getActiveRooms().find(r => r === room);
        if(roomExsist) {
            response({success: false, msg: `${room} already exsist`});
        }else {
            this.socket.join(room);
            this.io.emit('rooms-list', this.getActiveRooms());
            response({success: true, msg: `${room} is created!`});
        }
    }

    public joinRoom = (room: string, response: Function) => {
        const roomSize: number = this.io.sockets.adapter.rooms.get(room)?.size || 0;
        if(roomSize >= 2) {
            response({success: false, msg: `${room} is full!`});
        }else {
            this.socket.join(room);
            response({success: true, msg: `User ${this.socket.username} is join to ${room} room`});
        }
    }

    private getActiveRooms(): Array<string> {
        const arr = Array.from(this.io.sockets.adapter.rooms);
        const filtered = arr.filter((room: any) => !room[1].has(room[0]));
        const res: Array<string> = filtered.map((i:any) => i[0]);
        return res;
    }

    private checkUsername(username: string): boolean {
        let exsist = false;
        this.io.sockets.sockets.forEach((socket: CustomSocket) => {
            if(socket.username === username) {
                exsist = true;
            }
        });
        return exsist;
    }

    public disconnect = () => {
        console.log('User disconnected:', this.socket.username);
    }
}