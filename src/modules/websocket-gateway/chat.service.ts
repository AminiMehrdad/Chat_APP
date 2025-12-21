import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { Messages } from './entities/messages.entity';
import { ConversationType } from './entities/conversation-type.enum';
import { Users } from '../users/Entitys/users.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Conversation)
        private conversationRepo: Repository<Conversation>,

        @InjectRepository(ConversationParticipant)
        private participantRepo: Repository<ConversationParticipant>,

        @InjectRepository(Messages)
        private messageRepo: Repository<Messages>,

        @InjectRepository(Users)
        private userRepo: Repository<Users>,
    ) { }

    async sendMessage(
        conversationId: number,
        senderId: number,
        text: string,
    ) {
        const isMember = await this.participantRepo.findOne({
            where: { conversationId, userId: senderId },
        });

        if (!isMember) {
            throw new ForbiddenException('You are not a member of this conversation');
        }

        const message = this.messageRepo.create({
            senderId,
            message: text,
            timestamp: Date.now(),
            conversation: { id: conversationId } as Conversation,
        });

        return this.messageRepo.save(message);
    }

    async getConversationMessages(conversationId: number) {
        return this.messageRepo.find({
            where: { conversation: { id: conversationId } },
            order: { timestamp: 'ASC' },
        });
    }

    async getOrCreatePrivateConversation(userA: number, userB: number) {
        const existing = await this.conversationRepo
            .createQueryBuilder('c')
            .innerJoin('c.participants', 'p1', 'p1.userId = :u1', { u1: userA })
            .innerJoin('c.participants', 'p2', 'p2.userId = :u2', { u2: userB })
            .where('c.type = :type', { type: ConversationType.PRIVATE })
            .getOne();

        console.log(existing);
        
        if (existing) return existing;

        // ساخت conversation جدید
        const conversation = await this.conversationRepo.save({
            type: ConversationType.PRIVATE,
        });

        // افزودن دو participant
        await this.participantRepo.save([
            { conversationId: conversation.id, userId: userA },
            { conversationId: conversation.id, userId: userB },
        ]);

        return conversation;
    }


    async getAdminConversation() {
        let conversation = await this.conversationRepo.findOne({
            where: { title: 'ADMIN_BROADCAST' },
        });

        if (conversation) return conversation;

        conversation = await this.conversationRepo.save({
            type: ConversationType.GROUP,
            title: 'ADMIN_BROADCAST',
        });

        const users = await this.userRepo.find();

        // همه کاربران عضو این conversation می‌شوند
        const participants = users.map((u) => ({
            conversationId: conversation.id,
            userId: u.id,
            isAdmin: u.role.name === 'admin' ? true : false,
        }));

        await this.participantRepo.save(participants);

        return conversation;
    }

    async sendMessageToAdmin(senderId: number, text: string) {
        const adminConversation = await this.getAdminConversation();

        const message = this.messageRepo.create({
            senderId,
            message: text,
            timestamp: Date.now(),
            conversation: adminConversation,
        });

        return this.messageRepo.save(message);
    }

}
