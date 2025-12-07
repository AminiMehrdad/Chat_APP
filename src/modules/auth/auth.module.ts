import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtModule],
  exports: [PasswordService, JwtModule, AuthService],
})
export class AuthModule {}
