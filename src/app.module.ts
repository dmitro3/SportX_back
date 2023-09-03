import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TelegramService} from './telegram/telegram.service';
import {TelegramModule} from './telegram/telegram.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {typeOrmAsyncConfig} from './config/typeorm.config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {Web3Service} from './web3/web3.service';
import {Web3Module} from './web3/web3.module';
import configuration from './config/configuration';
import {Web3jsModule} from 'nestjs-web3js/src/web3js/web3js.module';
import {UserController} from './user/user.controller';
import {MapGateway} from './maps/map.gateway';

import {UserModule} from './user/user.module';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {MapsModule} from "./maps/maps.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env',
        }),
        Web3jsModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                infuraUrl: configService.get<string>('INFURA_URL')
            })
        }),
        TelegramModule,
        JwtModule,
        AuthModule,
        MapsModule,
        Web3Module,
        UserModule],
    controllers: [AppController, UserController],
    providers: [AppService, TelegramService, Web3Service, JwtService, MapGateway],
})
export class AppModule {
}
