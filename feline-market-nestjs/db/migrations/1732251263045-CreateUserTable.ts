import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1732251263045 implements MigrationInterface {
    name = 'CreateUserTable1732251263045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'vendor', 'customer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'customer', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
