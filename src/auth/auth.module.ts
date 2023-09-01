import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {DiscordModule} from "./discord/discord.module";
import {UserModule} from "../user/user.module";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthModule} from "./jwt/jwt.module";
import {Web3AuthModule} from "./web3/web3.module";

@Module({
    imports: [
        JwtAuthModule,
        UserModule,
        Web3AuthModule,
        DiscordModule,
    ],
    providers: [AuthService, JwtService],
    controllers: [AuthController],
    exports: [AuthService, JwtService],
})
export class AuthModule {
}
