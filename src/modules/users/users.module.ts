import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './Entitys/users.entity';
import { UserController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { AcessRole } from './Entitys/role.entity';
import { Messages } from '../websocket-gateway/entities/messages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AcessRole, Messages]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
