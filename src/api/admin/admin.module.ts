import { Module } from '@nestjs/common';

import { AdminAuthModule } from '~/api/admin/auth/auth.module';

@Module({
  imports: [AdminAuthModule]
})
export class AdminModule {}
