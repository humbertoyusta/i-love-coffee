import { Module } from '@nestjs/common';
import { CoffeesRatingService } from './coffees-rating.service';

@Module({
    imports: [],
    controllers: [],
    providers: [CoffeesRatingService],
})
export class CoffeesRatingModule {}
