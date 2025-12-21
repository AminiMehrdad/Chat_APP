import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ConversationType } from './conversation-type.enum';
import { ConversationParticipant } from './conversation-participant.entity';
import { Messages } from './messages.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ConversationType,
  })
  type: ConversationType;

  @Column({ nullable: true })
  title?: string; 

  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
  )
  participants: ConversationParticipant[];

  @OneToMany(() => Messages, (m) => m.conversation)
  messages: Messages[];
}
