import { IsEmail } from 'class-validator';

export class SignInInput {
  @IsEmail()
  email: string;
}
