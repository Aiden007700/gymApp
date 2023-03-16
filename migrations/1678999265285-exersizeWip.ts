import { MigrationInterface, QueryRunner } from "typeorm";

export class exersizeWip1678999265285 implements MigrationInterface {
    name = 'exersizeWip1678999265285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "muscleGroups" text array NOT NULL, "equipment" text array NOT NULL, "difficulty" character varying NOT NULL, "videoUrl" character varying NOT NULL, "imageUrl" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exercise"`);
    }

}
