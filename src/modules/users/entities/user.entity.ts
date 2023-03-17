import { Role } from "../../auth/enums/role.enum";
import { Task } from "../../tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Exercise } from "../../exercise/entities/exercise.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  hashedPassword: string;

  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[];

  @OneToMany(() => Exercise, exercise => exercise.user, { eager: false })
  exercises: Exercise[];

  @Column('enum', { enum: Role, array: true, default: [Role.User] })
  roles: Role[];

  @CreateDateColumn({ name: 'created_at' }) 
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' }) 
  updated_at: Date;
}