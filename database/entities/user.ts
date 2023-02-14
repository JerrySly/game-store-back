import { Column, Entity } from "typeorm";
import { Base } from "./baseEntity";

@Entity({name: "user"})
export class User  extends Base{
    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    emailConfirmed?: boolean
}