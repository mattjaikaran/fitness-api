import {MigrationInterface, QueryRunner} from "typeorm";

export class MainMigration1629536582577 implements MigrationInterface {
    name = 'MainMigration1629536582577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "action" character varying(60) NOT NULL, "subject" character varying(60) NOT NULL, "meta" json NOT NULL, CONSTRAINT "UQ_c9cd48649b85cbed355d3e113f7" UNIQUE ("action", "subject"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(60) NOT NULL, "lastName" character varying(60), "username" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "mobile" character varying(20), "password" character varying(100) NOT NULL, "gender" "users_gender_enum", "dob" TIMESTAMP, "statusMessage" character varying(300), "image" character varying, "isActive" boolean NOT NULL DEFAULT false, "isApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timezone" character varying(100) NOT NULL DEFAULT 'Asia/Karachi', "meta" json, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_d376a9f93bba651f32a2c03a7d3" UNIQUE ("mobile"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" integer NOT NULL, "roleId" integer NOT NULL, "meta" json, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role" character varying(60) NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_has_permissions" ("roleId" integer NOT NULL, "permId" integer NOT NULL, CONSTRAINT "PK_b55cb731c210e7853f069dfc92f" PRIMARY KEY ("roleId", "permId"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "contactNumber" character varying(20) NOT NULL, "email" character varying(100) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "floor_plans" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4243d68fe3bfa6a38a2cccd5e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "styles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1f22d2e5045f508c5fce0eb6e86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "timingsId" integer, CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "timings" ("id" SERIAL NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_958c4b40d9ebccf9f482a96f71b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "box_rates" ("id" SERIAL NOT NULL, "rate" numeric NOT NULL DEFAULT '0', "boxId" integer, "timingId" integer, CONSTRAINT "PK_a7c2ceb0300641335c06195741b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boxes" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "shortDescription" character varying(500) NOT NULL, "longDescription" text NOT NULL, "size" numeric NOT NULL, "maxCapacity" numeric NOT NULL, "heated" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "floorPlanId" integer, "styleId" integer, "locationId" integer, CONSTRAINT "PK_749574b01e0038dae8464fcb445" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "features" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "box_features" ("boxId" integer NOT NULL, "featureId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_12f797697ee041b191527c4de51" PRIMARY KEY ("boxId", "featureId"))`);
        await queryRunner.query(`CREATE TABLE "user_has_permissions" ("userId" integer NOT NULL, "permId" integer NOT NULL, CONSTRAINT "PK_3ce2da2b4e924aa4bd5e2de2775" PRIMARY KEY ("userId", "permId"))`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "meta" json`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef155d0ef76f650dce3ba6aeb2" ON "box_features" ("boxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7d2894c5da3490b2c80db1f18" ON "box_features" ("featureId") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" ADD CONSTRAINT "FK_dd078e2e770ada7645e6121e5dc" FOREIGN KEY ("permId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" ADD CONSTRAINT "FK_f5b84501bf8bc5bfdb6437f8e82" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days" ADD CONSTRAINT "FK_555813be6b1fc8ca8af2be79acf" FOREIGN KEY ("timingsId") REFERENCES "timings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "box_rates" ADD CONSTRAINT "FK_c04087fc6d478f6554b86cf3fcc" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "box_rates" ADD CONSTRAINT "FK_9eed9b4269d7e27289794086d8e" FOREIGN KEY ("timingId") REFERENCES "timings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boxes" ADD CONSTRAINT "FK_4e96aae7bae09f73c950c57e6d7" FOREIGN KEY ("floorPlanId") REFERENCES "floor_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boxes" ADD CONSTRAINT "FK_eff2c9e6c63e5a40ff4c2648be9" FOREIGN KEY ("styleId") REFERENCES "styles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boxes" ADD CONSTRAINT "FK_787841aac0fffb79b3e845ec985" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD CONSTRAINT "FK_e7d2894c5da3490b2c80db1f184" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" ADD CONSTRAINT "FK_b13ffb2f9c10d9cef776346c87e" FOREIGN KEY ("permId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" ADD CONSTRAINT "FK_11e5563f3670fd042c68718a505" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_permissions" DROP CONSTRAINT "FK_11e5563f3670fd042c68718a505"`);
        await queryRunner.query(`ALTER TABLE "user_has_permissions" DROP CONSTRAINT "FK_b13ffb2f9c10d9cef776346c87e"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP CONSTRAINT "FK_e7d2894c5da3490b2c80db1f184"`);
        await queryRunner.query(`ALTER TABLE "boxes" DROP CONSTRAINT "FK_787841aac0fffb79b3e845ec985"`);
        await queryRunner.query(`ALTER TABLE "boxes" DROP CONSTRAINT "FK_eff2c9e6c63e5a40ff4c2648be9"`);
        await queryRunner.query(`ALTER TABLE "boxes" DROP CONSTRAINT "FK_4e96aae7bae09f73c950c57e6d7"`);
        await queryRunner.query(`ALTER TABLE "box_rates" DROP CONSTRAINT "FK_9eed9b4269d7e27289794086d8e"`);
        await queryRunner.query(`ALTER TABLE "box_rates" DROP CONSTRAINT "FK_c04087fc6d478f6554b86cf3fcc"`);
        await queryRunner.query(`ALTER TABLE "days" DROP CONSTRAINT "FK_555813be6b1fc8ca8af2be79acf"`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" DROP CONSTRAINT "FK_f5b84501bf8bc5bfdb6437f8e82"`);
        await queryRunner.query(`ALTER TABLE "role_has_permissions" DROP CONSTRAINT "FK_dd078e2e770ada7645e6121e5dc"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`DROP INDEX "IDX_e7d2894c5da3490b2c80db1f18"`);
        await queryRunner.query(`DROP INDEX "IDX_ef155d0ef76f650dce3ba6aeb2"`);
        await queryRunner.query(`DROP INDEX "IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "box_features" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "box_features" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "meta" json`);
        await queryRunner.query(`DROP TABLE "user_has_permissions"`);
        await queryRunner.query(`DROP TABLE "box_features"`);
        await queryRunner.query(`DROP TABLE "features"`);
        await queryRunner.query(`DROP TABLE "boxes"`);
        await queryRunner.query(`DROP TABLE "box_rates"`);
        await queryRunner.query(`DROP TABLE "timings"`);
        await queryRunner.query(`DROP TABLE "days"`);
        await queryRunner.query(`DROP TABLE "styles"`);
        await queryRunner.query(`DROP TABLE "floor_plans"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "role_has_permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
