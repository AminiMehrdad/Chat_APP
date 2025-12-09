// users.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, Repository } from 'typeorm';
import { Users } from './Entitys/users.entity';
import { CreateUsersDto } from 'src/common/dto/create-users.dto';
import { UpdateUsersDto } from 'src/common/dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  async create(dto: CreateUsersDto) {
    
    const user = this.usersRepo.create(dto);

    try {
      return await this.usersRepo.save(user);
    } catch (error: any) {
      const code = error?.code || error?.driverError?.code;

      if (code === '23505' || code === 'ER_DUP_ENTRY') {
        const detail: string = error.detail || error.sqlMessage || '';

        if (detail.includes('phonenumber')) {
          throw new ConflictException('Phone number already exists');
        }
        if (detail.includes('username')) {
          throw new ConflictException('Username already exists');
        }

        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Could not create user');
    }
  }

  findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });

    // if (!user) {
    //   throw new NotFoundException(`User with id ${id} not found`);
    // }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepo.findOne({ where: { username } });

    // if (!user) {
    //   throw new NotFoundException(`User with username ${username} not found`);
    // }

    return user;
  }

  async findByPhonenumber(phonenumber: string) {
    const user = await this.usersRepo.findOne({ where: { phonenumber } });

    // if (!user) {
    //   throw new NotFoundException(
    //     `User with phonenumber ${phonenumber} not found`,
    //   );
    // }

    return user;
  }

  async update(id: number, dto: UpdateUsersDto) {
    const updateData: Partial<Users> = { ...dto };

    try {
      const result = await this.usersRepo.update(id, updateData);

      if (result.affected === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    } catch (error: any) {
      const code = error?.code || error?.driverError?.code;

      if (code === '23505' || code === 'ER_DUP_ENTRY') {
        const detail: string = error.detail || error.sqlMessage || '';

        if (detail.includes('phonenumber')) {
          throw new ConflictException('Phone number already exists');
        }
        if (detail.includes('username')) {
          throw new ConflictException('Username already exists');
        }

        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Could not update user');
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.usersRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return { deleted: true };
  }

  async updateRefreshToken(
    userId: number,
    hashedRefreshToken: string,
  ): Promise<void> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Update the user's hashed refresh token
    user.hashedRefreshToken = hashedRefreshToken;

    // Save the updated user entity back to the database
    await this.usersRepo.save(user);
  }
}
