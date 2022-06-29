/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import configCoffees from './coffees/config.coffees';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
});

describe('CoffeesService', () => {
    let coffeesService: CoffeesService;
    let coffeesRepository: MockRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(configCoffees)], // Add
            controllers: [], // Add
            providers: [
                CoffeesService,
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
                { provide: getRepositoryToken(Flavour), useValue: createMockRepository() },
            ],   // Add
        }).compile();

        coffeesService = moduleRef.get<CoffeesService>(CoffeesService);
        coffeesRepository = moduleRef.get<MockRepository>(getRepositoryToken(Coffee));
    });

    it('should be defined', () => {
        expect(coffeesService).toBeDefined();
    });
});
