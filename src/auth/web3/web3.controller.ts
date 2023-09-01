import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {JwtAuthService} from '../jwt/jwt.services';
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.entity";


@Controller('auth/web3')
export class Web3AuthController {
    constructor(
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService
    ) {
    }

    @Post()
    async web3(@Req() req, @Res() res, @Body() body) {
        const {address, ...inner} = body;
        const userCreated = await this.userService.createAndCheck({
            address: address,
            provider: "web3",
            providerId: address
        } as User);
        const {access_token} = await this.jwtAuthService.login(userCreated);
        return res
            .status(200)
            .cookie('access_token', access_token, {
                httpOnly: true,
                sameSite: 'lax',
            })
            .json({success: true});
    }
}
