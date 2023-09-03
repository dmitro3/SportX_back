import {NestFactory} from '@nestjs/core';
import {SeedModule} from './seed.module';
import {MapsCreated} from "./maps/MapsCreated";

const runSeed = async () => {
    const app = await NestFactory.create(SeedModule);
    await app.get(MapsCreated).run();
    await app.close();
};

void runSeed();
