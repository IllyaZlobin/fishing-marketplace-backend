import { Module } from '@nestjs/common';

import { RoleListQueryHandler } from '~/app/role/query-handlers/list';
import { PersistenceRoleModule } from '~/persistence/role/role.module';

@Module({
  imports: [PersistenceRoleModule],
  providers: [RoleListQueryHandler]
})
export class RoleModule {}
