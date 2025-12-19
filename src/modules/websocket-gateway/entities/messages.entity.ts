// messages.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  conversation: Conversation;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'bigint' })
  timestamp: number;
}
