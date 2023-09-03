import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693649894009 implements MigrationInterface {
    name = 'Auto1693649894009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`maps\` ADD \`amount\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`maps\` DROP COLUMN \`amount\``);
    }

}
