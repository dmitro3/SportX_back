import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693597104439 implements MigrationInterface {
    name = 'Auto1693597104439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`balance\` \`balance\` int NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`balance\` \`balance\` int NULL`);
    }

}
