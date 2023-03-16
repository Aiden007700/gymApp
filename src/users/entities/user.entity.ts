import { Role } from "../../auth/enums/role.enum";
import { Task } from "../../tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  hashedPassword: string;

  @OneToMany(() => Task, task => task.user, { eager: true })
  tasks: Task[];

  @Column('enum', { enum: Role, array: true, default: [Role.User] })
  roles: Role[];
}