import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Sender username or identifier',
    example: 'user_123',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  sender: string;

  @ApiProperty({
    description: 'Receiver username or identifier',
    example: 'user_456',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  receiver: string;

  @ApiProperty({
    description: 'Message body (long text allowed)',
    example: 'Hello, this is a long message...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100000) // کنترل منطقی برای جلوگیری از abuse
  message: string;

  @ApiProperty({
    description: 'Clock string (HH:mm or custom format)',
    example: '14:32',
  })
  @IsString()
  @IsNotEmpty()
  clock: string;

  @ApiProperty({
    description: 'Date string (ISO or custom format)',
    example: '2025-01-10',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Unix timestamp or numeric time',
    example: 1736500000,
  })
  @IsNumber()
  time: number;
}
