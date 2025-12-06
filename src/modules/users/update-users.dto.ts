import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { GenderEnum } from './users.entity';

export class UpdateUsersDto {

  @ApiProperty({ example: 'Ali', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: '09054274429', required: false })
  @IsOptional()
  @Matches(/^09[0-9]{9}$/, {
    message: 'Phone number must be a valid Iranian number (09xxxxxxxxx)'
  })
  phonenumber?: string;

  @ApiProperty({ example: '1234', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'male', enum: GenderEnum, required: false })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
