import { CoffeesModule } from './coffees/coffees.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesRatingModule } from './coffees-rating/coffees-rating/coffees-rating.module';
import { ConfigModule } from '@nestjs/config';
import appConfig, { JoiValidateDatabaseInfo } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidateDatabaseInfo,
    }),
    CoffeesModule,
    CoffeesRatingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ...appConfig().database,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
