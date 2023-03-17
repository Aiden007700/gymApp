import { Exclude } from "class-transformer";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../task.status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, user => user.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User

    @CreateDateColumn({ name: 'created_at' }) 
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' }) 
    updated_at: Date;
}
