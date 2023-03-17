import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'
import { type } from 'os';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string', description: 'Task title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string', description: 'Task description' })
  description: string;
}
