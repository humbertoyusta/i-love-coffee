import { Module } from '@nestjs/common';
import { CoffeesModule } from '../../coffees/coffees.module';
import { CoffeesRatingService } from './coffees-rating.service';

@Module({
    imports: [CoffeesModule],
    controllers: [],
    providers: [CoffeesRatingService],
})
export class CoffeesRatingModule {}
