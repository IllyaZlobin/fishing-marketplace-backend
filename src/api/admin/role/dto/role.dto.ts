import { ApiProperty } from '@nestjs/swagger';

import { PolicyAction, PolicyRoleType, PolicySubject } from '~/common/policy/constants';

interface IPermissionDtoPayload {
  subject: PolicySubject;
  actions: PolicyAction[];
}

export class PermissionDto {
  @ApiProperty({ enum: PolicySubject })
  subject: PolicySubject;

  @ApiProperty({ enum: PolicyAction, isArray: true })
  actions: PolicyAction[];

  constructor(payload: IPermissionDtoPayload) {
    this.subject = payload.subject;
    this.actions = payload.actions;
  }
}

interface IRoleDtoPayload {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  type: PolicyRoleType;
  permissions?: IPermissionDtoPayload[];
  createdAt: Date;
  updatedAt: Date;
}
export class RoleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ enum: PolicyRoleType })
  type: PolicyRoleType;

  @ApiProperty({ isArray: true, type: PermissionDto })
  permissions: PermissionDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(payload: IRoleDtoPayload) {
    this.id = payload.id;
    this.name = payload.name;
    this.description = payload.description;
    this.isActive = payload.isActive;
    this.type = payload.type;
    this.permissions = payload.permissions?.map((permission) => new PermissionDto(permission)) ?? [];
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }
}
