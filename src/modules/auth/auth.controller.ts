import { Controller, Post, Body, Res, HttpCode, UseGuards, Get, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateUsersDto } from 'src/common/dto/create-users.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateUsersDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signup(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }

  @Public()
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
  async refresh(
    @Res({ passthrough: true }) res: Response, 
    @Req() req: Request,
    @Body('userId') userId: number, 
    @Body('refreshToken') refreshToken?: string
  ) {
    const token = refreshToken ?? req.cookies?.['refresh_token'];

    const { accessToken, refreshToken: newRt } = await this.authService.refresh(userId, token);

    res.cookie('refresh_token', newRt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return req.user
  }
}
