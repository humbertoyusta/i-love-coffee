/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor (
        @InjectRepository(Coffee)
        private coffeeRepository: Repository<Coffee>,
    ) {}
    
    getCoffees(): Promise<Coffee[]> {
        return this.coffeeRepository.find();
    }

    async getCoffee(idToGet: number): Promise<Coffee> {
        const coffee: Coffee = await this.coffeeRepository.findOneBy({
            id: idToGet,
        });
        if (typeof(coffee) === 'undefined')
            throw new NotFoundException(`Coffee with id ${idToGet} not found`);
        else
            return coffee;
    }

    addCoffee (createCoffeeDto: CreateCoffeeDto) : any {
        const coffee: Coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async deleteCoffee (id: number) : Promise<Coffee> {
        const coffee: Coffee = await this.getCoffee(id);
        return this.coffeeRepository.remove(coffee);
    }

    async updateCoffee(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee: Coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
        })
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${id} not found`);
        else
            return coffee;
    }
}
