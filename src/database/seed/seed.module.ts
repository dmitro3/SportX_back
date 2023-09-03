import {UserService} from "../../user/user.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../../config/configuration";
import {User} from "../../user/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmAsyncConfig} from "../../config/typeorm.config";
import {Module} from "@nestjs/common";
import {MapsService} from "../../maps/maps.service";
import {MapsCreated} from "./maps/MapsCreated";
import {Maps} from "../../maps/maps.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forFeature([
            User,
            Maps
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env',
        }),
    ],
    providers: [
        MapsCreated,
        UserService,
        MapsService
    ],
})
export class SeedModule {
}
