import {Injectable} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Request} from 'express';
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }
        return null;
    }

    async validate(payload: any) {
        return true
    }
}
