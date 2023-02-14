import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token' })
export class Token {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  token!: string;
}
