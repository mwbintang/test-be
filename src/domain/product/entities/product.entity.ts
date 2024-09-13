import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'CategoryId' })
  CategoryId: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  length: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'int' })
  harga: number;
}
