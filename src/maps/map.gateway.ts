import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";

@WebSocketGateway({
    cors: true
})
export class MapGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly userService: UserService) {
    }

    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('WebSocket server initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('Client connected');
    }

    @SubscribeMessage('location')
    async handleLocation(client: Socket, payload: any) {
        console.log(payload)
        // if (payload?.userId) {
        //     const user = await this.userService.findUser(payload.userId);
        //
        //     await this.userService.update({
        //         ...user,
        //         balance: payload.balance,
        //     } as User)
        // }

    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
    }
}
