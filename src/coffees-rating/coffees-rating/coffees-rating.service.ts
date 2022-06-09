/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeesRatingService {
    constructor(coffeesService: CoffeesService) {}
}
