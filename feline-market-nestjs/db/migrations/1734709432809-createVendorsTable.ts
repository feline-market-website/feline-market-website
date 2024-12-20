import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVendorsTable1734709432809 implements MigrationInterface {
    name = 'CreateVendorsTable1734709432809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "logo_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_65b4134d1ddc73872e6abee2c1" UNIQUE ("user_id"), CONSTRAINT "PK_9c956c9797edfae5c6ddacc4e6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vendors" ADD CONSTRAINT "FK_65b4134d1ddc73872e6abee2c17" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendors" DROP CONSTRAINT "FK_65b4134d1ddc73872e6abee2c17"`);
        await queryRunner.query(`DROP TABLE "vendors"`);
    }

}
