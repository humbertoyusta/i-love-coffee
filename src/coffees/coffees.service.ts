/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class CoffeesService {
    constructor (
        @InjectRepository(Coffee)
        private coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private flavourRepository: Repository<Flavour>,
    ) {}
    
    getCoffees(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
        return this.coffeeRepository.find({
            relations: ['flavours'],
            take: paginationQueryDto.limit,
            skip: paginationQueryDto.offset,
        });
    }

    async getCoffee(idToGet: number): Promise<Coffee> {
        const coffee: Coffee = await this.coffeeRepository.findOne({
            where: {id: idToGet},
            relations: ['flavours']
        });
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${idToGet} not found`);
        else
            return coffee;
    }

    async addCoffee (createCoffeeDto: CreateCoffeeDto) : Promise<Coffee> {
        const flavours: Flavour[] = await Promise.all(
            createCoffeeDto.flavours.map(flavour => this.loadFlavourByName(flavour))
        );
        const coffee: Coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavours,
        });
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
        const flavours: Flavour[] = updateCoffeeDto.flavours && await Promise.all(
            updateCoffeeDto.flavours.map(flavour => this.loadFlavourByName(flavour))
        );
        
        let coffee: Coffee = await this.coffeeRepository.preload({
            id: +idToUpdate,
            ...updateCoffeeDto,
            flavours,
        })
        if (!coffee)
            throw new NotFoundException(`Coffee with id ${idToUpdate} not found`);
        else
            return this.coffeeRepository.save(coffee);
    }

    private async loadFlavourByName(flavourName: string): Promise<Flavour> {
        const inDbFlavour = await this.flavourRepository.findOne({where: {name: flavourName}});
        if (inDbFlavour) {
            return inDbFlavour;
        }
        else {
            return this.flavourRepository.create({name: flavourName});
        }
    }
}
