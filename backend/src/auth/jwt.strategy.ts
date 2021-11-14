import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import isBlocked from 'src/common/user-helper';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.uid);
    if (!user || isBlocked(user)) throw new NotAcceptableException();

    return user;
  }
}
