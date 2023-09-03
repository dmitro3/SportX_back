import {Module} from '@nestjs/common';
import {MapsController} from './maps.controller';
import {MapsService} from "./maps.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Maps} from "./maps.entity";
import {UserModule} from "../user/user.module";
import {JwtAuthModule} from "../auth/jwt/jwt.module";

@Module({
    imports: [
        UserModule,
        JwtAuthModule,
        TypeOrmModule.forFeature([Maps]),
    ],
    providers: [MapsService,],
    controllers: [MapsController],
    exports: [MapsService]
})
export class MapsModule {
}
