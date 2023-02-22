import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  description: string;
}
