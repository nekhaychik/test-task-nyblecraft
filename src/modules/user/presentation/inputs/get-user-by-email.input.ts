import { IsEmail } from 'class-validator';

export class GetUserByEmailInput {
  @IsEmail()
  email: string;
}
