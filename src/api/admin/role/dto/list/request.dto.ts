import { ApiProperty } from '@nestjs/swagger';

import { PaginationOptionDto } from '~/common/dto/response.dto';
import { PolicyRoleType } from '~/common/policy/constants';

export class RoleListRequestDto extends PaginationOptionDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  type?: PolicyRoleType;

  @ApiProperty({ required: false })
  isActive?: boolean;
}
