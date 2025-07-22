export enum PaginationTypeEnum {
  LIMIT_AND_OFFSET = 'limit',
  TAKE_AND_SKIP = 'take'
}

export interface IPaginationOptions<CustomMetaType = IPaginationMeta> {
  limit: number | string;
  page: number | string;
  metaTransformer?: (meta: IPaginationMeta) => CustomMetaType;
  paginationType?: PaginationTypeEnum;
  cacheQueries?: TypeORMCacheType;
}

export type TypeORMCacheType =
  | boolean
  | number
  | {
      id: any;
      milliseconds: number;
    };

export interface ObjectLiteral {
  [s: string]: any;
}

export interface IPaginationMeta extends ObjectLiteral {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
