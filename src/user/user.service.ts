import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import zeroPad from "../utils/zeropad";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async username(): Promise<string> {
        let userExists = true;
        let newUsername: string | PromiseLike<string>;
        while (userExists) {
            const num = Math.floor(Math.random() * 1000000);
            newUsername = `User${zeroPad(num, 6)}`;
            const user = await this.userRepository.findOne({
                where: {
                    username: newUsername,
                },
            });
            if (!user) {
                userExists = false;
            }
        }
        return newUsername;
    }

    async findUser(id: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findUserProvider(providerId: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                providerId: providerId
            }
        })
    }

    async createAndCheck(user: User): Promise<User> {
        const userCreated = await this.findUserProvider(user.providerId);
        if (userCreated) {
            throw new UnauthorizedException('User already exists');
        }
        user.username = await this.username();
        return this.userRepository.save(user)
    }

    async create(user: User): Promise<User> {
        const userCreated = await this.findUserProvider(user.providerId);
        if (userCreated) {
            return userCreated;
        }
        user.username = await this.username();
        return this.userRepository.save(user)
    }
}
