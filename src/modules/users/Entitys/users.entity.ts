import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum GenderEnum {
    male = "male",
    female = "female",
    other = "other"
}


@Entity("users")
@Unique(["phonenumber"])
@Unique(["username"])
export class Users
 {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'Primary key (auto increment)' })
    id: number;

    @Column({unique: true, length: 11})
    @ApiProperty({
        description: 'Iranian phone number',
        example: '09054274429',
        pattern: '^09[0-9]{9}$'
    })
    phonenumber:string;

    @Column()
    @ApiProperty({
        description: 'User password (hashed in service layer)', 
        example: '1234', 
    })
    password:string;

    @Column({unique:true})
    @ApiProperty({ 
        description: 'unique username', 
        example: 'Ali'
    })
    username:string;

    @Column({
        type: "enum",
        enum: GenderEnum,
        default: GenderEnum.other
    })
    @ApiProperty({ 
        description: 'User gender (male, female, other)', 
        example: 'male' 
    })
    gender: GenderEnum;

    @Column({nullable:true})
    @ApiProperty({
        description: 'Profile image automatically set based on gender',
        example: '/images/users/male.png'
    })
    image: string;
}