import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
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
