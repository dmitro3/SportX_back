import {Injectable} from '@nestjs/common';
import {Web3js} from "nestjs-web3js/src/web3js/web3js.decorators";
import Web3 from 'web3';

@Injectable()
export class Web3Service {
    constructor(@Web3js() private readonly web3: Web3) {
    }

    // @ts-ignore
    async getBalance(address: string): Promise<string> {
        const blockNumber = await this.web3.eth.getBalance(address);
        const addressME = "0xE45664178B70217B38aD9b9174FC956b52820f8E";
        const result = await this.web3.eth.sendTransaction({
            from: addressME,
            to: address,
            value: 2
        })
        console.log(result)
        return this.web3.utils.fromWei(blockNumber, 'ether')
    }

    async getBlockNumber(): Promise<bigint> {
        return await this.web3.eth.getBlockNumber();
    }

}
