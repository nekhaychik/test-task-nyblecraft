import { IsEmail } from 'class-validator';

export class DeleteUserInput {
  @IsEmail()
  email: string;
}
