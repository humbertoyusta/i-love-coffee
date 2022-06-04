import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column()
    brand: string;

    @Column('json', { nullable: true })
    flavours: string[];
}