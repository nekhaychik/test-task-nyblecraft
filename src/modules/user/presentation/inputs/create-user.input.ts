import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;
}
