import {Module} from '@nestjs/common';
import {Web3Service} from "./web3.service";
import { Web3Controller } from './web3.controller';

@Module({
    imports: [],
    controllers: [Web3Controller],
    providers: [
        Web3Service
    ],
})
export class Web3Module {
}
