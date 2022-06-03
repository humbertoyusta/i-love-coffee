/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffeesList : Coffee[] = [];
    
    getCoffees(): Coffee[] {
        return this.coffeesList;
    }

    getCoffee(id: string): Coffee {
        const coffee: Coffee = this.coffeesList.find((c: Coffee) => (c.id == id));
        if (typeof(coffee) === 'undefined')
            throw new NotFoundException(`Coffee with id ${id} not found`);
        else
            return coffee;
    }

    addCoffee (coffee : Coffee) : void {
        this.coffeesList.push(coffee);
    }

    deleteCoffee (id: string) : void {
        let index : number = this.coffeesList.findIndex((c: Coffee) => (c.id == id));
        if (index == -1)
            throw new NotFoundException(`Coffee with id ${id} not found`);
        else
            this.coffeesList.splice(index, 1);
    }

    updateCoffee(id: string,newPartCoffee: Coffee): void {
        let index : number = this.coffeesList.findIndex((c: Coffee) => (c.id == id));
        if (index != -1) {
            // update this.coffeesList[index] with newPartCoffee
        }
        else
            throw new NotFoundException(`Coffee with id ${id} not found`);
    }
}
