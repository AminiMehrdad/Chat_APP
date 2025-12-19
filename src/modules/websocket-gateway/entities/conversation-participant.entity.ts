import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('conversation_participants')
@Unique(['conversationId', 'userId'])
export class ConversationParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversationId: number;

  @Column()
  userId: number;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.participants,
    { onDelete: 'CASCADE' },
  )
  conversation: Conversation;

  @Column({ default: false })
  isAdmin: boolean;
}
