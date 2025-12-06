import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
    @ApiProperty({ example: 'Ali' })
    username: string;

    @ApiProperty({ example: '09054274429' })
    phonenumber: string;

    @ApiProperty({ example: '1234' })
    password: string
    @ApiProperty({ example: 'mean' })
    gender: string;
}

export class UpdateUsersDto {
    @ApiProperty({ example: 'Ali' , required:false})
    username?: string;

    @ApiProperty({ example: '09054274429' , required:false })
    phonenumber?: string;

    @ApiProperty({ example: '1234' , required:false })
    password?: string
    @ApiProperty({ example: 'mean' , required:false })
    gender?: string;
}
