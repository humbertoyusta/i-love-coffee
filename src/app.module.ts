import { CoffeesModule } from './coffees/coffees.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesRatingModule } from './coffees-rating/coffees-rating/coffees-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CoffeesModule,
    CoffeesRatingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
