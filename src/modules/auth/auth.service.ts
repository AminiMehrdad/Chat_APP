import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Users } from '../users/Entitys/users.entity';
import { CreateUsersDto } from 'src/common/dto/create-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async hash(data: string) {
    return argon2.hash(data, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB
      timeCost: 3, // iterations
      parallelism: 1,
    });
  }

  private async verifyHash(hash: string, plain: string) {
    return argon2.verify(hash, plain);
  }

  async signup(dto: CreateUsersDto) {
    const existing = await this.usersService.findByUsername(dto.username);
    const userPhonenumber = await this.usersService.findByPhonenumber(
      dto.phonenumber,
    );

    if (existing || userPhonenumber) {
      throw new UnauthorizedException(
        'User whith this username already exists',
      );
    }

    const passwordHash = await this.hash(dto.password);
    const userImage =
      dto.gender == 'female' ? '/images/female.png' : '/images/male.png';

    const user = await this.usersService.create({
      ...dto,
      password: passwordHash,
      image: userImage,
    });

    const tokens = await this.issueTokens(
      user.id,
      user.username,
      user.image,
      user.phonenumber,
    );

    await this.usersService.updateRefreshToken(
      user.id,
      await this.hash(tokens.refreshToken),
    );

    return tokens;
  }

  async login(dto: { phonenumber: string; password: string }) {
    const user = await this.usersService.findByPhonenumber(dto.phonenumber);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await this.verifyHash(user.password, dto.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.issueTokens(
      user.id,
      user.username,
      user.image,
      user.phonenumber,
    );

    await this.usersService.updateRefreshToken(
      user.id,
      await this.hash(tokens.refreshToken),
    );

    return tokens;
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const ok = await this.verifyHash(user.hashedRefreshToken, refreshToken);
    if (!ok) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.issueTokens(
      user.id,
      user.username,
      user.image,
      user.phonenumber,
    );
    await this.usersService.updateRefreshToken(
      user.id,
      await this.hash(tokens.refreshToken),
    );

    return tokens;
  }

  private async issueTokens(
    userId: number,
    username: string,
    image: string,
    phonenumber: string,
  ) {
    const payload = {
      sub: userId,
      username,
      image,
      phonenumber,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '120d',
    });

    return { accessToken, refreshToken };
  }
}
