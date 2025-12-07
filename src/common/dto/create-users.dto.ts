import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { GenderEnum } from '../../modules/users/Entitys/users.entity';

export class CreateUsersDto {
  @ApiProperty({ example: 'Ali' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '09054274429' })
  @Matches(/^09[0-9]{9}$/, {
    message: 'Phone number must be a valid Iranian number (09xxxxxxxxx)',
  })
  phonenumber: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'male', enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsOptional()
  @IsString()
  image: string;
}
