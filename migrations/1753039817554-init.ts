import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1753039817554 implements MigrationInterface {
  name = 'Init1753039817554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."permissions_subject_enum" AS ENUM('user', 'role', 'auth')`);
    await queryRunner.query(
      `CREATE TYPE "public"."permissions_actions_enum" AS ENUM('manage', 'read', 'create', 'update', 'delete')`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("role_id" integer NOT NULL, "subject" "public"."permissions_subject_enum" NOT NULL, "actions" "public"."permissions_actions_enum" array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "pk_permissions__role_id__subject" PRIMARY KEY ("role_id", "subject"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_type_enum" AS ENUM('super_admin', 'admin', 'vendor', 'customer')`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "type" "public"."roles_type_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "u_roles__name" UNIQUE ("name"), CONSTRAINT "pk_roles__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`CREATE INDEX "ix_roles__name" ON "roles" ("name") `);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "u_users__email" UNIQUE ("email"), CONSTRAINT "pk_users__id" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "fk_permissions__roles__role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_users__roles__role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_users__roles__role_id"`);
    await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "fk_permissions__roles__role_id"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP INDEX "public"."ix_roles__name"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_type_enum"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TYPE "public"."permissions_actions_enum"`);
    await queryRunner.query(`DROP TYPE "public"."permissions_subject_enum"`);
  }
}
