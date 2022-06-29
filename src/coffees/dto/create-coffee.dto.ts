import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export class CreateCoffeeDto {
    @ApiProperty({description: "The name of the coffee"})
    @IsString()
    name: string;

    @ApiProperty({examples: ["cubita", "lallave"]})
    @IsString()
    brand: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString({ each: true })
    flavours: string[];
}
