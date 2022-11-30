import { IsEmail } from 'class-validator';

export class GetGeneratedPdfInput {
  @IsEmail()
  email: string;
}
