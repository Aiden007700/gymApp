import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString, IsUrl } from 'class-validator';
import { difficultyType, muscleGroupType } from 'src/common/types/types';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsArray()
    muscleGroups?: muscleGroupType[];

    @IsArray()
    equipment?: string[];

    @IsString()
    difficulty: difficultyType;

    @IsUrl()
    videoUrl?: string;

    @IsUrl()
    imageUr?: string;
}
