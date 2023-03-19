import { MigrationInterface, QueryRunner } from "typeorm";

export class nutraceuticals1679239098525 implements MigrationInterface {
    name = 'nutraceuticals1679239098525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nutraceutical" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "pricePerUnit" integer NOT NULL, "minOrder" integer NOT NULL, "maxOrder" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0922c32712cd55a2f0246bb43dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "nutraceutical"`);
    }

}
