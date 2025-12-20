import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUsersDto } from '../../common/dto/create-users.dto';

import { Role, Users } from './Entitys/users.entity';
import { UpdateUsersDto } from '../../common/dto/update-users.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import type { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBody({ type: CreateUsersDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: Users,
  })
  create(@Body() body: CreateUsersDto) {
    return this.userService.create(body);
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'List of All User Name and status',
    type: [Users],
  })
  findUsers(@Req() req: Request, @Headers('authorization') authHeader: string) {
    const id = req['user'].sub;
    return this.userService.foundUsers(id);
  }

  @Get('Info')
  @ApiResponse({ status: 200, description: 'Single user', type: Users })
  async Info(@Req() req: Request) {
    const username = req['user'].username;
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return {
      id: user.id,
      username: user.username,
      image: user.image,
      phonenumber: user.phonenumber,
    };
  }
  @Get()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'List of all users', type: [Users] })
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'Single user', type: Users })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiBody({ type: UpdateUsersDto })
  @ApiResponse({ status: 200, description: 'User updated', type: Users })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUsersDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'User deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
