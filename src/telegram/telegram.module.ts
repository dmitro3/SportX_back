import {Module} from '@nestjs/common';
import {TelegramService} from "./telegram.service";
import {TelegrafModule} from "nestjs-telegraf";
import {ConfigService} from "@nestjs/config";

const BOT_TOKEN = new ConfigService().get<string>('BOT_TOKEN');

@Module({
    imports: [
        // TelegrafModule.forRootAsync({
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => {
        //         return {
        //             token: configService.get<string>('BOT_TOKEN'),
        //         }
        //     },
        // }),
    ],
    controllers: [],
    providers: [TelegramService],
})
export class TelegramModule {
}
