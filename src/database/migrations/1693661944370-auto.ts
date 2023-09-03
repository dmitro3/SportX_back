import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1693661944370 implements MigrationInterface {
    name = 'Auto1693661944370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_maps_maps\` (\`userId\` varchar(36) NOT NULL, \`mapsId\` int NOT NULL, INDEX \`IDX_d6330b17f60e939adc7219373a\` (\`userId\`), INDEX \`IDX_05e92f4494b0166e741c0d09d3\` (\`mapsId\`), PRIMARY KEY (\`userId\`, \`mapsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_maps_maps\` ADD CONSTRAINT \`FK_d6330b17f60e939adc7219373a6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_maps_maps\` ADD CONSTRAINT \`FK_05e92f4494b0166e741c0d09d33\` FOREIGN KEY (\`mapsId\`) REFERENCES \`maps\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_maps_maps\` DROP FOREIGN KEY \`FK_05e92f4494b0166e741c0d09d33\``);
        await queryRunner.query(`ALTER TABLE \`user_maps_maps\` DROP FOREIGN KEY \`FK_d6330b17f60e939adc7219373a6\``);
        await queryRunner.query(`DROP INDEX \`IDX_05e92f4494b0166e741c0d09d3\` ON \`user_maps_maps\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6330b17f60e939adc7219373a\` ON \`user_maps_maps\``);
        await queryRunner.query(`DROP TABLE \`user_maps_maps\``);
    }

}
