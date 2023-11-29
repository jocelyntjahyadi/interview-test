import {IsNumber, IsString, IsNotEmpty, Validate, IsOptional} from "class-validator";
import { IsUnique } from "src/user/shared/validation/is-unique";
import { IsUniqueConstraint } from "src/user/shared/validation/is-unique-constraint";

export class UserDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    @IsUnique({tableName : 'user', column : 'email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    avatar: string;
}

