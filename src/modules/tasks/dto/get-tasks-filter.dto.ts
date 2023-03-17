import { TaskStatus } from '../task.status.enum';
import { ApiProperty } from '@nestjs/swagger'

export class GetTasksFilterDto {
  @ApiProperty({ required: false, description: 'Task status' })
  status?: TaskStatus;

  @ApiProperty({ required: false, description: 'Task search' })
  search?: string;
}
