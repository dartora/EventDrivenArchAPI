import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserSchema1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, enable uuid-ossp extension if not enabled
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Drop existing table if exists
    await queryRunner.dropTable('user', true);

    // Create new table with proper UUID primary key
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
        "email" VARCHAR NOT NULL,
        "consents" TEXT[] DEFAULT ARRAY[]::TEXT[],
        CONSTRAINT "PK_user_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_user_email" UNIQUE ("email")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
