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

import { Role, Users } from './Entitys/users.entity';
import { UpdateUsersDto } from '../../common/dto/update-users.dto';
import { Roles } from '../auth/decorators/roles.decorator';

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
