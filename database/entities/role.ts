import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./baseEntity";

@Entity({name: 'role'})

export class Role extends Base {

    @Column()
    name!: string
}