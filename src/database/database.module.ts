import { DynamicModule, Module } from '@nestjs/common';
import { createConnection, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
    static register(dataSourceOptions: DataSourceOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'DATA_SOURCE',
                    useValue: createConnection(dataSourceOptions)
                }
            ]
        }
    }
}
