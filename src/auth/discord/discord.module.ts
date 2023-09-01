import {Module} from "@nestjs/common";
import {DiscordGuard} from "./discord.guard";
import {DiscordController} from "./discord.controller";
import {DiscordStrategy} from "./discord.strategy";
import {UserModule} from "../../user/user.module";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthModule} from "../jwt/jwt.module";

@Module({
    imports: [UserModule, JwtAuthModule],
    controllers: [DiscordController],
    providers: [DiscordGuard, DiscordStrategy, JwtService],
})
export class DiscordModule {

}