import { Module } from '@nestjs/common';

import { RoleController } from '~/api/admin/role/role.controller';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: []
})
export class RoleModule {}
