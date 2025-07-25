import { ApiProperty } from '@nestjs/swagger';

import { RoleDto } from '~/api/admin/role/dto/role.dto';
import { PaginationMetaDto } from '~/common/dto/response.dto';

export class RoleListResponseDto {
  @ApiProperty({ type: [RoleDto] })
  data: RoleDto[];

  @ApiProperty()
  pagination: PaginationMetaDto;

  constructor(data: RoleDto[], pagination: PaginationMetaDto) {
    this.data = data;
    this.pagination = pagination;
  }
}
