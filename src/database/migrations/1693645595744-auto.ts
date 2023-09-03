import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693645595744 implements MigrationInterface {
    name = 'Auto1693645595744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`maps\` (\`id\` int NOT NULL, \`array\` json NULL, \`city\` varchar(255) NULL, \`region\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`provider\` varchar(255) NOT NULL, \`providerId\` varchar(255) NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, \`balance\` int NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`maps\``);
    }

}
