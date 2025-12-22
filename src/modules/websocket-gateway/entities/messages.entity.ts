// messages.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Conversation } from './conversation.entity';
import { Users } from 'src/modules/users/Entitys/users.entity';

@Entity('messages')
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (c) => c.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @Column()
  conversationId: number;

  @ManyToOne(() => Users, (u) => u.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column()
  userId: number;

  @Column()
  senderId: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'bigint' })
  timestamp: number;
}
