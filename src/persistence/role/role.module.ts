import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '~/persistence/entities';
import { RoleReadRepo } from '~/persistence/role/role-read.repo';
import { ROLE_READ_REPO } from '~/persistence/role/types';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [{ provide: ROLE_READ_REPO, useClass: RoleReadRepo }],
  exports: [ROLE_READ_REPO]
})
export class PersistenceRoleModule {}
