/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffeesList : Coffee[] = [];
    
    addCoffee (coffee : Coffee) : void {
        this.coffeesList.push(coffee);
    }

    deleteCoffee (id: string) : boolean {
        let index : number = this.coffeesList.findIndex((c: Coffee) => (c.id == id));
        if (index != -1)
            this.coffeesList.splice(index, 1);
        return index != -1;
    }

    getCoffees(): Coffee[] {
        return this.coffeesList;
    }
}
