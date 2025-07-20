import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

import { app, appConfigSchema } from '~/config/app.config';
import { database, databaseConfigSchema } from '~/config/database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env`],
      load: [app, database],
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...databaseConfigSchema
      }),
      validationOptions: {
        abortEarly: true,
        debug: true,
        stack: true
      }
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
