import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

import { AppErrorType } from '~/common/errors';
import { IPaginationOptions } from '~/common/types/pagination';

export class ErrorResponseDto {
  @ApiProperty({ enum: AppErrorType })
  type: AppErrorType;

  @ApiProperty()
  message: string;

  @ApiProperty({ nullable: true })
  code?: number;

  @ApiProperty({ isArray: true, type: String })
  errors: string[];
}

export class PaginationMetaDto {
  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

export class PaginationOptionDto implements IPaginationOptions {
  @ApiProperty({ default: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ default: 10 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}
