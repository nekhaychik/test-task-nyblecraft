import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../allpication';
import { SignInInput, SignUpInput } from './inputs';
import { SignInResult, SignUpResult } from './results';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(FileInterceptor('file'))
  public async signUp(@Body() body: SignUpInput, @UploadedFile() file: Express.Multer.File): Promise<SignUpResult> {
    return await this.authService.signUp({ ...body, file });
  }

  @Post('sign-in')
  public async signIn(@Body() body: SignInInput): Promise<SignInResult> {
    return await this.authService.signIn({ ...body });
  }
}
