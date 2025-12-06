import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  create(data: Partial<Users>) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Users>) {
    return this.usersRepo.update(id, data);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
