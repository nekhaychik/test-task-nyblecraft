import { Status, UserDto } from '../../user';
import { Token } from '../presentation';

export interface SignUpParameters {
  email: string;
  firstName: string;
  lastName: string;
  file: Express.Multer.File;
}

export interface SignInParameters {
  email: string;
}

export interface CreateTokenParameters {
  email: string;
}

export interface SignInResult {
  token: Token;
  user: UserDto;
}

export interface SignUpResult {
  status: Status;
  data: UserDto;
}
