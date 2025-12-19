import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinConversation')
  async handleJoin(
    @MessageBody() conversationId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`conversation-${conversationId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    payload: {
      conversationId: number;
      senderId: number;
      text: string;
    },
  ) {
    const message = await this.chatService.sendMessage(
      payload.conversationId,
      payload.senderId,
      payload.text,
    );

    this.server
      .to(`conversation-${payload.conversationId}`)
      .emit('newMessage', message);

    return message;
  }
}
