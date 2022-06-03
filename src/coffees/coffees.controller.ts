import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}
    @Get()
    findAll (): Coffee[] {
        return this.coffeeService.getCoffees();
    }
    @Get(':id')
    findOne (@Param('id') id: string): Coffee {
        return this.coffeeService.getCoffee(id);
    }
    @Post()
    create(@Body() body: CreateCoffeeDto): void {
        this.coffeeService.addCoffee(body);
    }
    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.coffeeService.deleteCoffee(id);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCoffeeDto): void {
        this.coffeeService.updateCoffee(id, body);
    }
}
