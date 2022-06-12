/*
https://docs.nestjs.com/modules
*/

import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
class CoffeeBrandsFactory {
    async create(): Promise<string[]> {
        const coffeeBrands = await Promise.resolve(['cubita', 'lallave', 'criollo']);
        return coffeeBrands;
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService, 
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS, 
            useFactory: async (coffeeBrandsFactory: CoffeeBrandsFactory): Promise<string[]> => {
                return coffeeBrandsFactory.create();
            },
            inject: [CoffeeBrandsFactory],
        },
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
