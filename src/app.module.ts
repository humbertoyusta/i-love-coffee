import { CoffeesModule } from './coffees/coffees.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesRatingModule } from './coffees-rating/coffees-rating/coffees-rating.module';
import { ConfigModule } from '@nestjs/config';
import appConfig, { JoiValidateDatabaseInfo } from './config/app.config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidateDatabaseInfo,
    }),
    CoffeesModule,
    CoffeesRatingModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ...appConfig().database,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //{
    //  provide: APP_PIPE,
    //  useValue: new ValidationPipe({
    //    whitelist: true,
    //    forbidNonWhitelisted: true,
    //    transform: true,
    //    transformOptions: {
    //      enableImplicitConversion: true,
    //    },
    //  }),
    //},
  ],
})
export class AppModule { }
