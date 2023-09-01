import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {DiscordGuard} from "./discord.guard";
import {JwtAuthService} from "../jwt/jwt.services";
import {User} from "../../user/user.entity";

@Controller('auth/discord')
export class DiscordController {
    constructor(
        private readonly jwtAuthService: JwtAuthService,
    ) {
    }

    @Get()
    @UseGuards(DiscordGuard)
    async discordLogin(@Req() _req, @Res() res: Response) {
        return "Hello"
    }

    @Get('callback')
    @UseGuards(DiscordGuard)
    async callback(
        @Res() res: Response,
        @Req() req: Request,
    ) {
        console.log(req.user);

        const {access_token} = await this.jwtAuthService.login(req.user as User);
        return res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        }).redirect("/")
    }
}
