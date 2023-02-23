import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./entities/task.entity";

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
}