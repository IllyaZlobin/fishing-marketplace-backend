import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

import { ConfigModule } from '~/config/config.module';
import { IConfig } from '~/config/types';
import { ENTITIES, RoleEntity } from '~/persistence/entities';
import { RoleSeed } from '~/seed/providers/role.seed';

@Module({
  imports: [
    CommandModule,
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
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [RoleSeed]
})
export class SeedModule {}
