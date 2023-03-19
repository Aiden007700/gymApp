import { PartialType } from '@nestjs/swagger';
import { CreateNutraceuticalDto } from './create-nutraceutical.dto';

export class UpdateNutraceuticalDto extends PartialType(CreateNutraceuticalDto) {}
