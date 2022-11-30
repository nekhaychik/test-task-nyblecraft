import { UserDto } from '../../../user';

export class SignInResult {
  token: Token;
  user: UserDto;
}

export interface Token {
  expires_in: number;
  access_token: string;
}
