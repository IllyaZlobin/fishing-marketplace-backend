import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from '~/api/admin/role/dto/create/create.request.dto';
import { RoleListRequestDto } from '~/api/admin/role/dto/list/request.dto';
import { RoleListResponseDto } from '~/api/admin/role/dto/list/response.dto';
import { RoleDto } from '~/api/admin/role/dto/role.dto';
import { IRoleListQueryResult, RoleListQuery } from '~/app/role/queries/list';
import { ErrorResponseDto } from '~/common/dto/response.dto';

@ApiTags('Admin Role')
@Controller('admin/roles')
export class RoleController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  async create(@Body() payload: CreateRoleDto){}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: RoleListResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto })
  async list(@Query() payload: RoleListRequestDto): Promise<RoleListResponseDto> {
    const result: IRoleListQueryResult = await this.queryBus.execute(new RoleListQuery(payload));
    return new RoleListResponseDto(
      result.items.map((item) => new RoleDto(item)),
      {
        itemCount: result.meta.itemCount,
        totalItems: result.meta.totalItems,
        itemsPerPage: result.meta.itemsPerPage,
        totalPages: result.meta.totalPages,
        currentPage: result.meta.currentPage
      }
    );
  }
}
