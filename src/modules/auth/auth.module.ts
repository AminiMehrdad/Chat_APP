import {  forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AcessRole } from '../users/Entitys/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/Entitys/users.entity';
import { UsersModule } from '../users/users.module';
import { UserId } from 'src/common/commonServices/userIdfinder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AcessRole]), 
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtModule, UserId],
  exports: [ JwtModule, AuthService, UserId],
  // PasswordService,
})
export class AuthModule {}
