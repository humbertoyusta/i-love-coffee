import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll () : string {
        return 'All coffees';
    }
    @Get(':id')
    findOne (@Param('id') id : string) : string {
        return `Coffee ${id}`;
    }
    @Post()
    create(@Body() body) : string {
        return `creates a coffee, with id ${body.id}`;
    }
    @Delete(':id')
    delete(@Param('id') id : string,@Body() body) : string {
        return `deletes the coffee with id ${id}`;
    }
    @Patch(':id')
    update(@Param('id') id : string, @Body() body) : string {
        return `updates the coffee with id ${id}`;
    }
}
