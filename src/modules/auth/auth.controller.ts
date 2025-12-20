import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  UseGuards,
  Get,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
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
  async signup(
    @Body() dto: CreateUsersDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, role } =
      await this.authService.signup(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken, role: role.name };
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, role } =
      await this.authService.login(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken, role: role.name };
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body('refreshToken') refreshToken?: string,
  ) {
    const token = refreshToken ?? req.cookies?.['refresh_token'];

    const {
      accessToken,
      refreshToken: newRt,
      role,
    } = await this.authService.refresh(token);

    res.cookie('refresh_token', newRt, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken, role: role.name };
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
