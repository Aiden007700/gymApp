import { IsArray, IsString, IsUrl } from "class-validator";
import { difficultyType, muscleGroupType } from "src/common/types/types";

export class CreateExerciseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    muscleGroups: muscleGroupType[];

    @IsArray()
    equipment?: string[];

    @IsString()
    difficulty: difficultyType;

    @IsUrl()
    videoUrl?: string;

    @IsUrl()
    imageUr?: string;
}
