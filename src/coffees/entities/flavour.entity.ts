import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffee.entity";

@Entity()
export class Flavour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    name: string;

    @ManyToMany(
        type => Coffee, 
        (coffee) => coffee.flavours
    )
    coffees: Coffee[]
}
