import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthUsers1787089295478 implements MigrationInterface {
    name = 'CreateAuthUsers1787089295478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_users_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'LOCKED')`);
        await queryRunner.query(`CREATE TABLE "auth_users" 
            (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "email" character varying NOT NULL, 
            "password_hash" character varying NOT NULL, 
            "status" "public"."auth_users_status_enum" NOT NULL DEFAULT 'ACTIVE', 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "UQ_13d8b49e55a8b06bee6bbc828fb" UNIQUE ("email"), 
            CONSTRAINT "PK_c88cc8077366b470dafc2917366" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth_users"`);
        await queryRunner.query(`DROP TYPE "public"."auth_users_status_enum"`);
    }

}
