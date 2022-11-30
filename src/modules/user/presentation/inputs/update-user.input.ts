import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsEmail()
  newEmail?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;
}

export class UpdateUserParams {
  @IsEmail()
  email: string;
}
