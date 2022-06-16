import { IsOptional, IsString } from "class-validator";
export class CreateCoffeeDto {
    @IsString()
    name: string;

    @IsString()
    brand: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString({ each: true })
    flavours: string[];
}
