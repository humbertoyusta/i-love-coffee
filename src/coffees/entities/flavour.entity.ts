import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flavour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
