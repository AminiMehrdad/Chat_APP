import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB
      timeCost: 3, // iterations
      parallelism: 1,
    });
  }

  async verifyPassword(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
