import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRoleListQueryResult, RoleListQuery } from '~/app/role/queries/list';
import { IRoleReadRepo, ROLE_READ_REPO } from '~/persistence/role/types';

@QueryHandler(RoleListQuery)
export class RoleListQueryHandler implements IQueryHandler<RoleListQuery, IRoleListQueryResult> {
  constructor(@Inject(ROLE_READ_REPO) private readonly roleReadRepo: IRoleReadRepo) {}

  async execute(query: RoleListQuery): Promise<IRoleListQueryResult> {
    return this.roleReadRepo.findAll(query.payload);
  }
}
