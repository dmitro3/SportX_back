import {Injectable} from '@nestjs/common';
import {User} from "../../user/user.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {
    }

    async login(user: User) {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
