import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback, Strategy } from 'passport-jwt';
import { UserDomain } from '../../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userDomain: UserDomain) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || 'secret',
    });
  }

  public async validate(req: any, done: VerifiedCallback): Promise<void> {
    const user = await this.userDomain.getUserByEmail({ ...req });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, user);
  }
}
