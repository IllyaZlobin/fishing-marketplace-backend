import { writeFileSync } from 'fs';

import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, logger: Logger) {
  const docPrefix = 'api-docs';
  const docTitle = 'Fishing marketplace API';

  const documentBuild = new DocumentBuilder()
    .setTitle(docTitle)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'accessToken'
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'refreshToken'
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, { deepScanRoutes: true });

  writeFileSync('swagger.json', JSON.stringify(document));
  SwaggerModule.setup(docPrefix, app, document, {
    jsonDocumentUrl: `${docPrefix}/json`,
    explorer: true,
    customSiteTitle: docTitle
  });
  logger.log(`Swagger documentation is available at /${docPrefix}`);
}
