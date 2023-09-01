import 'reflect-metadata';
import {ConnectionOptions, DataSource, DataSourceOptions} from 'typeorm';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";

require('dotenv').config()


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

export const typeOrmConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
    // subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',
};

const AppDataSource = new DataSource(typeOrmConfig);
export default AppDataSource;