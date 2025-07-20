import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from '~/api/api.module';
import { ConfigModule } from '~/config/config.module';
import { IConfig } from '~/config/types';
import { ENTITIES } from '~/persistence/entities';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig, true>) => {
        const databaseConfig = configService.get('database', { infer: true });
        return {
          ...databaseConfig,
          applicationName: 'fishing-marketplace',
          maxQueryExecutionTime: 500,
          synchronize: false,
          migrationsRun: false,
          installExtensions: false,
          entities: ENTITIES
        };
      }
    }),
    ApiModule
  ]
})
export class MainModule {}
