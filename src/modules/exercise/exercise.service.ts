import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {

  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exerciseRepository.create(createExerciseDto);
    return await this.exerciseRepository.save(exercise);
  }

  async findAll() {
    const exercises = await this.exerciseRepository.find();
    return exercises;
  }

  async findOne(id: number) {
    return await this.exerciseRepository.findOne({ 
      where: { id },
  });
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    let exercise = await this.findOne(id) 
    exercise = {...exercise, ...updateExerciseDto}
    await this.exerciseRepository.save(exercise)
    return exercise;
  }

  async remove(id: number) {
    this.findOne(id)
    return await this.exerciseRepository.delete(id)
  }
}
