import { muscleGroupType, difficultyType } from "src/common/types/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('text', { array: true })
    muscleGroups: muscleGroupType[];

    @Column('text', { array: true })
    equipment:  string[];

    @Column()
    difficulty: difficultyType;

    @Column()
    videoUrl: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn({ name: 'created_at' }) 
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;
}


