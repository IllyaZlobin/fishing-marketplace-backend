import { ConfigType } from '@nestjs/config';

import { AppConfig } from '~/config/app.config';
import { DatabaseConfig } from '~/config/database.config';

export interface IConfig {
  app: ConfigType<(...args: any) => AppConfig>;
  database: ConfigType<(...args: any) => DatabaseConfig>;
}
