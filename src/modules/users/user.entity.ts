import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Primary key (auto increment)' })
    id: number;

    @Column({unique: true})
    @ApiProperty({ description: 'User phone number', example: '09054274429' })
    phonenumber:string;

    @Column()
    @ApiProperty({ description: 'User Password', example: '1234' })
    password:string;

    @Column()
    @ApiProperty({ description: 'User Name', example: 'Ali' })
    username:string;

    @Column()
    @ApiProperty({ description: 'Gender shold be mean feman or other', example: 'mean' })
    gender:string
}