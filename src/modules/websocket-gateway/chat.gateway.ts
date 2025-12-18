import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from "src/common/dto/addMessage.dto";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger("ChatGateway");

    @SubscribeMessage("sendMessage")
    handleMessage(@MessageBody() payload: AddMessageDto ): AddMessageDto  {
        this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
        this.server.emit('newMessage', payload);
        return payload;
    }

    // it will be handled when a client connects to the server
    handleConnection(socket: Socket) {
        this.logger.log(`Socket connected: ${socket.id}`);
    }

    // it will be handled when a client disconnects from the server
    handleDisconnect(socket: Socket) {
        this.logger.log(`Socket disconnected: ${socket.id}`);
    }
}