import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService, Status } from '../../user';
import { Token } from '../presentation';
import { CreateTokenParameters, SignInParameters, SignInResult, SignUpParameters, SignUpResult } from './auth-service.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signUp({ email, firstName, lastName, file }: SignUpParameters): Promise<SignUpResult> {
    try {
      const user = await this.userService.createUser({ email, firstName, lastName, file });

      return { status: Status.success, data: user };
    } catch (err) {
      throw err;
    }
  }

  public async signIn({ email }: SignInParameters): Promise<SignInResult> {
    try {
      const user = await this.userService.getUserByEmail({ email });
      const token = await this.createToken({ email });
      return { token, user };
    } catch (err) {
      throw err;
    }
  }

  private async createToken({ email }: CreateTokenParameters): Promise<Token> {
    const expiresIn = +process.env.EXPIRES_IN || 360000000;
    const secretOrKey = process.env.SECRET_KEY || 'secret';
    const token = jwt.sign({ email }, secretOrKey, { expiresIn });

    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }
}
