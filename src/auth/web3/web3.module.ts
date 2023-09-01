import {Web3AuthController} from './web3.controller';
import {Module} from '@nestjs/common';
import {Web3AuthServices} from './web3.services';
import {JwtAuthModule} from '../jwt/jwt.module';
import {UserModule} from '../../user/user.module';

@Module({
    imports: [JwtAuthModule, UserModule],
    controllers: [Web3AuthController],
    providers: [Web3AuthServices],
})
export class Web3AuthModule {
}
