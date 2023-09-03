import {Injectable} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Request} from 'express';
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    // @ts-ignore
    const token = req.headers?.cookie?.access_token.split("access_token=")[1];
    console.log(token, "token")
    if (req.cookies && req.cookies.access_token || token) {
      return req.cookies?.access_token || token;
    }
    return null;
  }

  async validate(payload: any) {
    return {userId: payload.sub, username: payload.username};
  }
}
