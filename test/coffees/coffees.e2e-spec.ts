
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CoffeesService } from '../../src/coffees/coffees.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../../src/config/app.config';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { Coffee } from '../../src/coffees/entities/coffee.entity';
import { Flavour } from '../../src/coffees/entities/flavour.entity';
import { Event } from '../../src/events/entities/event.entity';

describe('coffees', () => {
  let app: INestApplication;
  const coffee = {
    name: "a",
    brand: "b",
    flavours: ["c", "d"],
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'p123',
          database: 'postgres',
          entities: [Coffee, Flavour, Event],
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
      providers: [],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 60000);

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then((request) => {
        const expectedCoffee = {
          ...coffee,
          flavours: coffee.flavours.map(name => ({name})),
        };
        expect(request.body).toMatchObject(expectedCoffee);
      });
  }, 60000);
  it.todo('Get all [GET /]');
  it.todo('Get one [POST /:id]');
  it.todo('Delete one [DELETE /:id]');
  it.todo('Update one [PATCH /:id]');

  afterAll(async () => {
    await app.close();
  });
});