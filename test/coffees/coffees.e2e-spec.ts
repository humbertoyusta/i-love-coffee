
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CoffeesService } from '../../src/coffees/coffees.service';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

describe('coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoffeesModule],
      providers: [],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [POST /:id]');
  it.todo('Delete one [DELETE /:id]');
  it.todo('Update one [PATCH /:id]');

  afterAll(async () => {
    await app.close();
  });
});