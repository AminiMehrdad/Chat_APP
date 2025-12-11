import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AcessRole } from './role.entity';

export enum GenderEnum {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum Role {
  User = "user",
  Admin = "admin",
}

@Entity('users')
@Unique(['phonenumber'])
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Primary key (auto increment)' })
  id: number;

  @Column({ unique: true, length: 11 })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Iranian phone number',
    example: '09054274429',
    pattern: '^09[0-9]{9}$',
  })
  phonenumber: string;

  @Column()
  @ApiProperty({
    description: 'User password (hashed in service layer)',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'unique username',
    example: 'Ali',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.other,
  })
  @ApiProperty({
    description: 'User gender (male, female, other)',
    example: 'male',
  })
  gender: GenderEnum;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Profile image automatically set based on gender',
    example: '/images/users/male.png',
  })
  image: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @ManyToOne(() => AcessRole, role => role.users, { eager: true })
  role: AcessRole;
    static role: any;
}
