import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {UserService} from "../../user/user.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verify(token, {
                secret: 'secret',
            });
            console.log(payload)
            request['user'] = await this.userService.findUser(payload.sub);


        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        if (request.cookies && request.cookies.access_token) {
            return request.cookies.access_token;
        }
    }
}
