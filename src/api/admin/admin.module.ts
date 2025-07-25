import { Module } from '@nestjs/common';

import { AuthModule } from '~/api/admin/auth/auth.module';
import { RoleModule } from '~/api/admin/role/role.module';

@Module({
  imports: [AuthModule, RoleModule]
})
export class AdminModule {}
