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

    @Column({default: 0})
    reccomendations: number;

    @JoinTable()
    @ManyToMany(
        type => Flavour, 
        (flavour) => flavour.coffees,
        {
            cascade: true,
        }
    )
    flavours: Flavour[];
}