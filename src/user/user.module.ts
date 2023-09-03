import {Module} from '@nestjs/common';
import {UserService} from "./user.service";
import {AuthModule} from "../auth/auth.module";
import {UserController} from "./user.controller";
import {User} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtAuthModule} from "../auth/jwt/jwt.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtAuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
