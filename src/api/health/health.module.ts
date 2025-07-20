import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from '~/api/health/health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController]
})
export class HealthModule {}
