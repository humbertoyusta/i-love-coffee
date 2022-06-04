import { IsString } from "class-validator";
export class CreateCoffeeDto {
    @IsString()
    brand: string;
    @IsString({ each: true })
    flavours?: string[];
}
