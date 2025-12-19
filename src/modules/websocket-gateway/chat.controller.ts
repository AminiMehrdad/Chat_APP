import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':conversationId/messages')
  getMessages(@Param('conversationId') conversationId: number) {
    return this.chatService.getConversationMessages(conversationId);
  }
}
