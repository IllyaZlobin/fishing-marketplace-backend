import { IQuery } from '@nestjs/cqrs';

import { PolicyRoleType } from '~/common/policy/constants';
import { IPaginationOptions } from '~/common/types/pagination';
import { IRoleReadRepo } from '~/persistence/role/types';

interface IRoleListQueryPayload extends IPaginationOptions {
  name?: string;
  type?: PolicyRoleType;
  isActive?: boolean;
}

export class RoleListQuery implements IQuery {
  name?: string;
  type?: PolicyRoleType;
  isActive?: boolean;

  constructor(readonly payload: IRoleListQueryPayload) {
    this.name = payload.name;
    this.type = payload.type;
    this.isActive = payload.isActive;
  }
}

export type IRoleListQueryResult = Awaited<ReturnType<IRoleReadRepo['findAll']>>;
