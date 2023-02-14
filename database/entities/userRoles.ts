import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./baseEntity";

@Entity({name: 'userRole'})
export class UserRole extends Base {

    @Column()
    userId!: number;
    
    @Column()
    roleId!: number;
}
