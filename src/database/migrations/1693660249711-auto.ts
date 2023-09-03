import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693660249711 implements MigrationInterface {
    name = 'Auto1693660249711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`maps\` ADD \`isBuy\` tinyint NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`maps\` ADD \`userId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`maps\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`maps\` DROP COLUMN \`isBuy\``);
    }

}
