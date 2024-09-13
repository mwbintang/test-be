import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './domain/product/product.module';
import { AuditLogModule } from './domain/audit_log/audit_log.module';
import { Product } from './domain/product/entities/product.entity';
import { AuditLog } from './domain/audit_log/entities/audit_log.entity';
import { FileUploadModule } from './domain/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',   // or your database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeorm',
      entities: [Product, AuditLog],
      synchronize: false,
    }),
    ProductModule,
    AuditLogModule,
    FileUploadModule,
  ],
})
export class AppModule {}
