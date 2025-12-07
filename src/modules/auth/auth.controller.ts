import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signup(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }

  @Post('refresh')
  async refresh(@Res({ passthrough: true }) res: Response, @Body('userId') userId: number, @Body('refreshToken') refreshToken?: string) {
    const token = refreshToken ?? (res.req as any).cookies['refresh_token'];

    const { accessToken, refreshToken: newRt } = await this.authService.refresh(userId, token);

    res.cookie('refresh_token', newRt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }
}
