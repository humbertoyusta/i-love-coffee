
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CoffeesService } from '../../src/coffees/coffees.service';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../../src/config/app.config';

describe('coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'p123',
                database: 'postgres',
                autoLoadEntities: true,
                synchronize: true,
            })
        }),
      ],
      providers: [],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 60000);

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [POST /:id]');
  it.todo('Delete one [DELETE /:id]');
  it.todo('Update one [PATCH /:id]');

  afterAll(async () => {
    await app.close();
  });
});