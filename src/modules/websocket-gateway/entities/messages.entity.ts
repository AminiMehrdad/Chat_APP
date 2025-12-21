// messages.entity.ts
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Users } from 'src/modules/users/Entitys/users.entity';

@Entity('messages')
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @OneToOne(() => Users)
  user:Users

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  conversation: Conversation;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'bigint' })
  timestamp: number;
}
