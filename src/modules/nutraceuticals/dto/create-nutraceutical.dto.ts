import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateNutraceuticalDto {
    @IsString()
    name: string;

    @IsDecimal()
    pricePerUnit: number;

    @IsInt()
    minOrder: number;

    @IsInt()
    maxOrder: number;
}
