import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavour } from "./flavour.entity";

@Entity()
export class Coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => Flavour, 
        (flavour) => flavour.coffees
    )
    flavours: string[];
}