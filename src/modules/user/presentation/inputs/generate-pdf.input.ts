import { IsEmail } from 'class-validator';

export class GeneratePdfInput {
  @IsEmail()
  email: string;
}
