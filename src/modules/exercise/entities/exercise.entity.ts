import { Exclude } from "class-transformer";
import { muscleGroupType, difficultyType } from "src/common/types/types";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => User, user => user.exercises, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

    @CreateDateColumn({ name: 'created_at' }) 
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;
}


