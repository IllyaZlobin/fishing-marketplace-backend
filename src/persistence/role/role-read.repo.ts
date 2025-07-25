import { InjectEntityManager } from '@nestjs/typeorm';
import _ from 'lodash';
import { EntityManager, In, Like } from 'typeorm';

import { PermissionEntity, RoleEntity } from '~/persistence/entities';
import { paginate } from '~/persistence/pagination/paginate';
import { Pagination } from '~/persistence/pagination/pagination';
import { IFindAllPayload, IRoleReadRepo } from '~/persistence/role/types';

export class RoleReadRepo implements IRoleReadRepo {
  constructor(@InjectEntityManager() private readonly em: EntityManager) {}

  async findOneByNameOrNull(name: string): Promise<RoleEntity | null> {
    const entity = await this.em.findOne(RoleEntity, { where: { name } });
    return entity;
  }

  async findAll(options: IFindAllPayload): Promise<Pagination<RoleEntity>> {
    const qb = this.em.createQueryBuilder(RoleEntity, 'role');

    if (options.name) {
      qb.andWhere('role.name LIKE :name', { name: `%${options.name}%` });
    }
    if (options.isActive) {
      qb.andWhere('role.isActive = :isActive', { isActive: options.isActive });
    }

    if (options.type) {
      qb.andWhere('role.type = :type', { type: options.type });
    }

    const paginator = await paginate(qb, options);

    if (paginator.items.length > 0) {
      const roleIds = paginator.items.map((item) => item.id);
      const permissions = await this.em.find(PermissionEntity, { where: { roleId: In(roleIds) } });
      const rolePermissionMap = _.groupBy(permissions, 'roleId');

      paginator.items = paginator.items.map((role) => ({ ...role, permissions: rolePermissionMap[role.id] }));
    }
    return paginator;
  }
}
