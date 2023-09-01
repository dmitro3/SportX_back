import {Injectable} from '@nestjs/common';

@Injectable()
export class JwtAuthService {
    constructor() {
    }


    async login(token: any, headers: any, ip: string) {
        return token
    }
}
