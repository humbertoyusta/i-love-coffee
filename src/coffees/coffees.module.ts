/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}
@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService, 
        {provide: COFFEE_BRANDS, useValue: ['cubita', 'lallave', 'criollo']},
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development'
                ? DevelopmentConfigService :
                ProductionConfigService,
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
