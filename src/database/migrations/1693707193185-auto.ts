import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693707193185 implements MigrationInterface {
    name = 'Auto1693707193185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`balance\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`balance\` int NULL DEFAULT '0'`);
    }

}
