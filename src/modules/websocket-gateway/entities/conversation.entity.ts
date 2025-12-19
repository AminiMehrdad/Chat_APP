import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ConversationType } from './conversation-type.enum';
import { ConversationParticipant } from './conversation-participant.entity';

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
  title?: string; // فقط برای group

  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
  )
  participants: ConversationParticipant[];
}
