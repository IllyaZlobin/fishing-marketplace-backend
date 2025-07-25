import { Module } from '@nestjs/common';

import { RoleModule } from '~/app/role/role.module';

@Module({
  imports: [RoleModule]
})
export class AppModule {}
