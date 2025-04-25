import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  MSP: number;

  @Column()
  ten_hang: string;

  @Column()
  so_luong: number;

  @Column()
  don_gia: number;
}