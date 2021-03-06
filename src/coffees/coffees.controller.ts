import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, NotFoundException, Param, Patch, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Coffee } from '../coffees/entities/coffee.entity';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}
    @Public()
    @Get()
    findAll (@Query() paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
        return this.coffeeService.getCoffees(paginationQueryDto);
    }
    @ApiForbiddenResponse({description: 'Forbidden'})
    @Get(':id')
    findOne (@Param('id', ParseIntPipe) id): Promise<Coffee> {
        return this.coffeeService.getCoffee(id);
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
