import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {JwtAuthService} from './jwt.services';
import {JwtStrategy} from './jwt.strategy';
import {AuthService} from '../auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: async () => {
                return {
                    secret: 'secret',
                    signOptions: {
                        expiresIn: '1d',
                    },
                };
            },
        }),
    ],
    providers: [
        JwtStrategy,
        JwtAuthService,
        AuthService,
    ],
    exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {
}
