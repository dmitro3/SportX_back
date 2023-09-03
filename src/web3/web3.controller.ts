import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {Web3Service} from "./web3.service";

@Controller('web3')
export class Web3Controller {
    constructor(
        private readonly web3Service: Web3Service
    ) {

    }

    @Post("/balance")
    async getBalance(@Body("address") address: string) {
        return this.web3Service.getBalance(address);
    }

    @Get("/blockNumber")
    async getBlockNumber() {
        return this.web3Service.getBlockNumber();
    }

    @Get("/abi")
    async abi(@Res() res) {
        return res.status(200).send({
            abi: this.web3Service.getAbi()
        })
    }
}
