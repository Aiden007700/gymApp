import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Nutraceutical {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    pricePerUnit: number;

    @Column()
    minOrder: number;

    @Column()
    maxOrder: number;

    @CreateDateColumn({ name: 'created_at' }) 
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;

}
