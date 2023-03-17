import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Task })
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskBy(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'The found records', type: [Task] })
  @ApiBody({ type: GetTasksFilterDto })
  getTasks(
    @Query() filter: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filter, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Task })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Task })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody({ type: CreateTaskDto })
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.', type: Task })
  updateTaskStatus(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted.', type: Task })
  deleteTask(@Param('id') id: number): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
