import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693596224607 implements MigrationInterface {
    name = 'Auto1693596224607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`provider\` varchar(255) NOT NULL, \`providerId\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`address\` varchar(255) NULL, \`balance\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
