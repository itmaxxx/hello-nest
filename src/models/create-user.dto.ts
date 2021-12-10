import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}