import { PolicyRoleType } from '~/common/policy/constants';
import { IPaginationOptions } from '~/common/types/pagination';
import { RoleEntity } from '~/persistence/entities';
import { Pagination } from '~/persistence/pagination/pagination';

export const ROLE_REPO = Symbol('ROLE_REPO');
export const ROLE_READ_REPO = Symbol('ROLE_READ_REPO');

interface CreateRolePayload {
  name: string;
  description?: string;
  isActive: boolean;
  type: PolicyRoleType;
}

export interface IRoleRepo {
  create(payload: CreateRolePayload): Promise<RoleEntity>;
  update(id: number, payload: Partial<CreateRolePayload>): Promise<RoleEntity>;
  delete(id: number): Promise<void>;
}

export interface IFindAllPayload extends IPaginationOptions {
  name?: string;
  type?: PolicyRoleType;
  isActive?: boolean;
}

export interface IRoleReadRepo {
  findAll(options: IFindAllPayload): Promise<Pagination<RoleEntity>>;
  findOneByNameOrNull(name: string): Promise<RoleEntity | null>;
}
