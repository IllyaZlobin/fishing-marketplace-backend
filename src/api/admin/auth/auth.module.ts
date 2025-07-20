import { Module } from '@nestjs/common';

import { AdminAuthController } from '~/api/admin/auth/auth.controller';

@Module({
  controllers: [AdminAuthController]
})
export class AdminAuthModule {}
