import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserId } from 'src/common/commonServices/userIdfinder.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userId: UserId,
  ) {}

  @Get(':conversationId/messages')
  getMessages(@Param('conversationId') conversationId: number) {
    return this.chatService.getConversationMessages(conversationId);
  }

  @Post('getconversation')
  async getprivateconversation(
    @Headers('authorization') auth: string,
    @Body() body: { userId: number; username: string },
  ) {
    const id = await this.userId.findUserId(auth.split(' ')[1]);
    if (body.username === 'admin') {
      var conversation = await this.chatService.getAdminConversation();
    } else {
      var conversation = await this.chatService.getOrCreatePrivateConversation(
        id,
        body.userId,
      );
    }
    const messages = await this.chatService.getConversationMessages(
      conversation.id,
    );
    return {
      conversationId: conversation.id,
      messages,
    };
  }
}
