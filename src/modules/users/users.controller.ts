import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUsersDto } from '../../common/dto/create-users.dto';

import { Users } from './Entitys/users.entity';
import { UpdateUsersDto } from '../../common/dto/update-users.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUsersDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: Users,
  })
  create(@Body() body: CreateUsersDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all users', type: [Users] })
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Single user', type: Users })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUsersDto })
  @ApiResponse({ status: 200, description: 'User updated', type: Users })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUsersDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
