import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./baseEntity";

@Entity({ name: 'game' })
export class Game extends Base {

  @Column()
  name!: string;
  
  @Column()
  tags?: number[];

  @Column()
  description!: string;

  @Column()
  price!: number;
  
  @Column()
  releaseDate?: Date;

  @Column()
  smallPicture?: string;

  @Column()
  bigPicture?: string
}
