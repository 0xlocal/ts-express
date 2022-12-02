import {MigrationInterface, QueryRunner} from "typeorm";

export class init1654098217547 implements MigrationInterface {
    name = 'init1654098217547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "category_id" SERIAL NOT NULL, "category_name" character varying NOT NULL, CONSTRAINT "UQ_9359e3b1d5e90d7a0fbe3b28077" UNIQUE ("category_name"), CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "book_detail" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "book_detail_id" SERIAL NOT NULL, "book_id" integer NOT NULL, "book_number" character varying NOT NULL, "deleteDate" TIMESTAMP, CONSTRAINT "PK_72c1291580e9f69c477183c9965" PRIMARY KEY ("book_detail_id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "book_id" SERIAL NOT NULL, "sku" character varying NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "year" integer NOT NULL, "image" character varying NOT NULL, "quantity" integer NOT NULL, "category_id" integer NOT NULL, "author_id" integer NOT NULL, "deleteDate" TIMESTAMP, CONSTRAINT "PK_b66091a3d2edddc14f6b91fc606" PRIMARY KEY ("book_id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "author_id" SERIAL NOT NULL, "author_name" character varying NOT NULL, CONSTRAINT "UQ_fe5ae13bba4a0b8f888d0b08895" UNIQUE ("author_name"), CONSTRAINT "PK_c36fb987d8132c9bdb15916e619" PRIMARY KEY ("author_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "identity_num" character varying NOT NULL, "date_of_birth" date NOT NULL, "place_of_birth" character varying NOT NULL, "phone" character varying NOT NULL, "role_id" integer NOT NULL, "deleteDate" TIMESTAMP, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "role_id" SERIAL NOT NULL, "role_name" character varying NOT NULL, "deleteDate" TIMESTAMP, CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "authority" ("authority_id" SERIAL NOT NULL, "authority_name" character varying NOT NULL, CONSTRAINT "PK_1e1b996b62d1a489d9896eeff1a" PRIMARY KEY ("authority_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_detail" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "inventory_detail_id" SERIAL NOT NULL, "inventory_id" integer NOT NULL, "user_id" integer NOT NULL, "book_detail_id" integer NOT NULL, CONSTRAINT "PK_701b0ad29365aa241dd67c5338b" PRIMARY KEY ("inventory_detail_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_history" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "inventory_history_id" SERIAL NOT NULL, "inventory_detail_id" integer NOT NULL, "inventory_id" integer NOT NULL, "user_id" integer NOT NULL, "book_detail_id" integer NOT NULL, CONSTRAINT "PK_d8dd807d316901e680fed7c7628" PRIMARY KEY ("inventory_history_id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "inventory_id" SERIAL NOT NULL, "book_id" integer NOT NULL, "qty_available" integer NOT NULL, "qty_on_borrow" integer NOT NULL, CONSTRAINT "PK_711db979ad954f0ab33e3eea53a" PRIMARY KEY ("inventory_id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_detail" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "transaction_detail_id" SERIAL NOT NULL, "transaction_id" integer NOT NULL, "book_detail_id" integer NOT NULL, CONSTRAINT "PK_a7b7afae5a3ab6870a1b5f94cf7" PRIMARY KEY ("transaction_detail_id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("create_date" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL DEFAULT 'SYSTEM', "update_date" TIMESTAMP DEFAULT now(), "update_by" character varying, "transaction_id" SERIAL NOT NULL, "transaction_no" character varying NOT NULL, "transaction_type" character varying NOT NULL, "transaction_date" TIMESTAMP NOT NULL, "user_id" integer NOT NULL, "quantity" integer NOT NULL, "borrow_start_date" TIMESTAMP NOT NULL, "borrow_end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "role_authority" ("role_id" integer NOT NULL, "authority_id" integer NOT NULL, CONSTRAINT "PK_78b82a35a02712fe5b774496fe2" PRIMARY KEY ("role_id", "authority_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1a07c216f9efbbc40e11d466b" ON "role_authority" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a6d5177acc4290e5a302ae5f8" ON "role_authority" ("authority_id") `);
        await queryRunner.query(`ALTER TABLE "book_detail" ADD CONSTRAINT "FK_37bf09e0bb5ab05419848c83b73" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_24b753b0490a992a6941451f405" FOREIGN KEY ("author_id") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_authority" ADD CONSTRAINT "FK_c1a07c216f9efbbc40e11d466b1" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_authority" ADD CONSTRAINT "FK_0a6d5177acc4290e5a302ae5f8c" FOREIGN KEY ("authority_id") REFERENCES "authority"("authority_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_authority" DROP CONSTRAINT "FK_0a6d5177acc4290e5a302ae5f8c"`);
        await queryRunner.query(`ALTER TABLE "role_authority" DROP CONSTRAINT "FK_c1a07c216f9efbbc40e11d466b1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_24b753b0490a992a6941451f405"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_0bfe418ce140d4720d0eede7c3e"`);
        await queryRunner.query(`ALTER TABLE "book_detail" DROP CONSTRAINT "FK_37bf09e0bb5ab05419848c83b73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a6d5177acc4290e5a302ae5f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1a07c216f9efbbc40e11d466b"`);
        await queryRunner.query(`DROP TABLE "role_authority"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_detail"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "inventory_history"`);
        await queryRunner.query(`DROP TABLE "inventory_detail"`);
        await queryRunner.query(`DROP TABLE "authority"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "book_detail"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
