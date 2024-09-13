import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1726165466378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the products table
    await queryRunner.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        "CategoryId" INT NOT NULL,
        "categoryName" VARCHAR(255) NOT NULL,
        sku VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        weight INT NOT NULL,
        width INT NOT NULL,
        length INT NOT NULL,
        height INT NOT NULL,
        image TEXT,
        harga INT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the audit_logs table
    await queryRunner.query(`
      CREATE TABLE audit_logs (
        id SERIAL PRIMARY KEY,
        method VARCHAR(50) NOT NULL,
        product_id INT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    // Create a trigger to update the updatedAt field
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_audit_logs_updated_at
      BEFORE UPDATE ON audit_logs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the trigger and the function
    await queryRunner.query(`DROP TRIGGER IF EXISTS update_audit_logs_updated_at ON audit_logs;`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column;`);

    // Drop the audit_logs table
    await queryRunner.query(`DROP TABLE audit_logs;`);

    // Drop the products table
    await queryRunner.query(`DROP TABLE products;`);
  }
}
