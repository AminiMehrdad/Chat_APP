import {  forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AcessRole } from '../users/Entitys/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/Entitys/users.entity';
import { UsersModule } from '../users/users.module';

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
  providers: [AuthService, JwtModule],
  exports: [ JwtModule, AuthService],
  // PasswordService,
})
export class AuthModule {}
