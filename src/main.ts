import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppErrorExceptionFilter, createExceptionFactory } from '~/api/exception-filters';
import { IConfig } from '~/config/types';
import { MainModule } from '~/main.module';
import { setupSwagger } from '~/setup-swagger';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const configService = app.get(ConfigService<IConfig, true>);

  const appConfig = configService.get('app', { infer: true });

  const globalPrefix = appConfig.globalPrefix;

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false, exceptionFactory: createExceptionFactory() })
  );

  app.useGlobalFilters(new AppErrorExceptionFilter());

  app.enableCors();
  app.enableShutdownHooks();

  setupSwagger(app, logger);

  await app.listen(appConfig.port);

  logger.log(`==========================================================`);
  logger.log(`🚀 Application is running on port ${appConfig.port}. Environment: ${appConfig.env}`);
  logger.log(`==========================================================`);
}
bootstrap();
