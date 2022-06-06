import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}
    @Get()
    findAll (@Query() paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
        return this.coffeeService.getCoffees(paginationQueryDto);
    }
    @Get(':id')
    findOne (@Param('id') id: string): Promise<Coffee> {
        return this.coffeeService.getCoffee(parseInt(id));
    }
    @Post()
    create(@Body() body: CreateCoffeeDto): Promise<Coffee> {
        return this.coffeeService.addCoffee(body);
    }
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Coffee> {
        return this.coffeeService.deleteCoffee(parseInt(id));
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCoffeeDto): Promise<Coffee> {
        return this.coffeeService.updateCoffee(parseInt(id), body);
    }
}
