import 'reflect-metadata';
import {ConnectionOptions, DataSource, DataSourceOptions} from 'typeorm';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {configs} from "@typescript-eslint/eslint-plugin";

const config = {
    port: new ConfigService().get("database.port"),
    host: new ConfigService().get("DB_HOST"),
    username: new ConfigService().get("DB_USER"),
    password: new ConfigService().get("DB_PASSWORD"),
    database: new ConfigService().get("DB_NAME"),
}
console.log(config)

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {

        return {
            type: 'mysql',
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USER"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_NAME"),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
            // subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
            migrationsTableName: 'typeorm_migrations',
            dropSchema: false,
            synchronize: false,
        };
    },
};


@Injectable()
export class AppDataSource extends DataSource {

    constructor(options: DataSourceOptions, config: ConfigService) {
        super({
            type: 'mysql',
            host: config.get("DB_HOST"),
            port: config.get("DB_PORT"),
            username: config.get("DB_USER"),
            password: config.get("DB_PASSWORD"),
            database: config.get("DB_NAME"),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
            // subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
            migrationsTableName: 'typeorm_migrations',
        });
        console.log(config.get("DB_HOST"));
    }
}

export default AppDataSource;