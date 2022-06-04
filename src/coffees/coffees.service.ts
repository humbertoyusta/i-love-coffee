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
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${idToGet} not found`);
        else
            return coffee;
    }

    async addCoffee (createCoffeeDto: CreateCoffeeDto) : Promise<Coffee> {
        const coffee: Coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async deleteCoffee (id: number) : Promise<Coffee> {
        const coffee: Coffee = await this.getCoffee(id);
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${id} not found`);
        else
            return this.coffeeRepository.remove(coffee);
    }

    async updateCoffee(idToUpdate: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
        let coffee: Coffee = await this.getCoffee(idToUpdate);
        coffee = await this.coffeeRepository.preload({
            id: +idToUpdate,
            ...updateCoffeeDto,
        })
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${idToUpdate} not found`);
        else
            return this.coffeeRepository.save(coffee);
    }
}
