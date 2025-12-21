import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { Messages } from './entities/messages.entity';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/Entitys/users.entity';
import { UserId } from 'src/common/commonServices/userIdfinder.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      ConversationParticipant,
      Messages,
      Users,
    ]),
  ],
  providers: [ChatGateway, ChatService, UserId, JwtService, UsersService],
  controllers: [ChatController],
})
export class ChatModule {}
