import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-discord';
import {config} from 'dotenv';
import {VerifiedCallback} from 'passport-jwt';
import {ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.entity";

config();

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {


    constructor(configService: ConfigService, private userService: UserService) {
        super({
            clientID: configService.get<string>('DISCORD_CLIENT'),
            clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
            callbackURL: `${configService.get<string>('NGROK_PUBLIC_URL')}/auth/discord/callback`,
            scope: ['identify', 'email', 'guilds', 'guilds.join'],
        });

    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifiedCallback,
    ): Promise<any> {
        const user = await this.userService.create({
            provider: profile.provider,
            username: profile.username,
            providerId: profile.id,
            email: profile.email
        } as User)


        return done(null, user);
    }
}
