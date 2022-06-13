/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event]), ConfigModule],
    controllers: [CoffeesController],
    providers: [CoffeesService],
    exports: [CoffeesService],
})
export class CoffeesModule {}
