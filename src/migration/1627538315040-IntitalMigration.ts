import {MigrationInterface, QueryRunner} from "typeorm";

export class IntitalMigration1627538315040 implements MigrationInterface {
    name = 'IntitalMigration1627538315040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "action" character varying(60) NOT NULL, "subject" character varying(60) NOT NULL, "meta" json NOT NULL, CONSTRAINT "UQ_c9cd48649b85cbed355d3e113f7" UNIQUE ("action", "subject"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(60) NOT NULL, "lastName" character varying(60), "username" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "mobile" character varying(20), "password" character varying(100) NOT NULL, "gender" "users_gender_enum", "dob" TIMESTAMP, "statusMessage" character varying(300), "image" character varying, "isActive" boolean NOT NULL DEFAULT false, "isApproved" boolean NOT NULL DEFAULT false, "consumedSmsCost" numeric NOT NULL DEFAULT '0', "consumedSubscriberCost" numeric NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timezone" character varying(100) NOT NULL DEFAULT 'Asia/Karachi', "meta" json, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_d376a9f93bba651f32a2c03a7d3" UNIQUE ("mobile"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, "meta" json, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role" character varying(60) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_has_permissions" ("roleId" integer NOT NULL, "permId" integer NOT NULL, CONSTRAINT "PK_b55cb731c210e7853f069dfc92f" PRIMARY KEY ("roleId", "permId"))`);
        await queryRunner.query(`CREATE TABLE "user_has_permissions" ("userId" integer NOT NULL, "permId" integer NOT NULL, CONSTRAINT "PK_3ce2da2b4e924aa4bd5e2de2775" PRIMARY KEY ("userId", "permId"))`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "meta" json`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" ADD CONSTRAINT "FK_dd078e2e770ada7645e6121e5dc" FOREIGN KEY ("permId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" ADD CONSTRAINT "FK_f5b84501bf8bc5bfdb6437f8e82" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" ADD CONSTRAINT "FK_b13ffb2f9c10d9cef776346c87e" FOREIGN KEY ("permId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" ADD CONSTRAINT "FK_11e5563f3670fd042c68718a505" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_permissions" DROP CONSTRAINT "FK_11e5563f3670fd042c68718a505"`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" DROP CONSTRAINT "FK_b13ffb2f9c10d9cef776346c87e"`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" DROP CONSTRAINT "FK_f5b84501bf8bc5bfdb6437f8e82"`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" DROP CONSTRAINT "FK_dd078e2e770ada7645e6121e5dc"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`DROP INDEX "IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "meta" json`);
        await queryRunner.query(`DROP TABLE "user_has_permissions"`);
        await queryRunner.query(`DROP TABLE "role_has_permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
