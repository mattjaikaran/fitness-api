import {MigrationInterface, QueryRunner} from "typeorm";

export class InstrcutorExpertise1629540800108 implements MigrationInterface {
    name = 'InstrcutorExpertise1629540800108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef155d0ef76f650dce3ba6aeb2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7d2894c5da3490b2c80db1f18"`);
        await queryRunner.query(`CREATE TABLE "expertise" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0c1f773f9419573f6bc37eebb7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instructor_expertise" ("id" SERIAL NOT NULL, "yearsOfExperience" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "expertiseId" integer, CONSTRAINT "PK_efeb8294018927a1faaf783a4c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "modelName" character varying(100) NOT NULL, "modelId" integer NOT NULL, "userId" integer NOT NULL, "filePath" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD "meta" json`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "public"."user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "public"."user_roles" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef155d0ef76f650dce3ba6aeb2" ON "public"."box_features" ("boxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7d2894c5da3490b2c80db1f18" ON "public"."box_features" ("featureId") `);
        await queryRunner.query(`ALTER TABLE "instructor_expertise" ADD CONSTRAINT "FK_f0c79f13e0b6a918258b03c6318" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_expertise" ADD CONSTRAINT "FK_49cd9b6a4dcd16b420f85f8f852" FOREIGN KEY ("expertiseId") REFERENCES "expertise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "instructor_expertise" DROP CONSTRAINT "FK_49cd9b6a4dcd16b420f85f8f852"`);
        await queryRunner.query(`ALTER TABLE "instructor_expertise" DROP CONSTRAINT "FK_f0c79f13e0b6a918258b03c6318"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7d2894c5da3490b2c80db1f18"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef155d0ef76f650dce3ba6aeb2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD "meta" json`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "instructor_expertise"`);
        await queryRunner.query(`DROP TABLE "expertise"`);
        await queryRunner.query(`CREATE INDEX "IDX_e7d2894c5da3490b2c80db1f18" ON "public"."box_features" ("featureId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef155d0ef76f650dce3ba6aeb2" ON "public"."box_features" ("boxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "public"."user_roles" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "public"."user_roles" ("userId") `);
        await queryRunner.query(`ALTER TABLE "public"."box_features" ADD CONSTRAINT "FK_ef155d0ef76f650dce3ba6aeb20" FOREIGN KEY ("boxId") REFERENCES "boxes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
