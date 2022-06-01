import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee.entity';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}
    @Get()
    findAll () : Coffee[] {
        return this.coffeeService.getCoffees();
    }
    @Get(':id')
    findOne (@Param('id') id : string) : Coffee {
        return this.coffeeService.getCoffee(id);
    }
    @Post()
    create(@Body() body): void {
        this.coffeeService.addCoffee(body);
    }
    @Delete(':id')
    delete(@Param('id') id : string, @Res() response) : void {
        if (this.coffeeService.deleteCoffee(id)) {
            response.status(HttpStatus.ACCEPTED).send();
        }
        else {
            response.status(HttpStatus.NOT_MODIFIED).send();
        }
    }
    @Put(':id')
    update(@Param('id') id : string, @Body() body) : void {
        this.coffeeService.updateCoffee(id, body);
    }
}
