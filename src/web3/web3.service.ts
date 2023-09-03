import {Injectable} from '@nestjs/common';
import {Web3js} from "nestjs-web3js/src/web3js/web3js.decorators";
import Web3, {Contract} from 'web3';
import {ConfigService} from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class Web3Service {
    private abi = JSON.parse(fs.readFileSync(path.resolve('./file/abi.json'), 'utf-8'))

    constructor(@Web3js() private readonly web3: Web3, private readonly configService: ConfigService) {

    }


    // @ts-ignore
    async getBalance(address: string): Promise<string> {
        const blockNumber = await this.web3.eth.getBalance(address);
        return this.web3.utils.fromWei(blockNumber, 'ether')
    }


    async contract() {
        const address = this.configService.get("WEB3_ADDRESS");
        const contract = new this.web3.eth.Contract(this.abi, this.configService.get("WEB3_ADDRESS")) as Contract<any>;
        // @ts-ignore
        contract.methods.mint("0xE45664178B70217B38aD9b9174FC956b52820f8E", 1).send({
            from: address,
            gasPrice: "0000000000000",
        }).then(res => console.log(res)).catch(err => console.log(err))

    }

    async getBlockNumber(): Promise<bigint> {
        return await this.web3.eth.getBlockNumber();
    }

    async getAbi(): Promise<any> {

        return this.contract()
    }

}
