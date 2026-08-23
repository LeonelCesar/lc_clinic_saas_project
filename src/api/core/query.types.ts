import type { BaseEntity } from "./entity.types";

export type SortDirection = "asc" | "desc";
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export type EntityFilters<T> = Partial<{
  [Key in keyof T]: T[Key];
}>;
export interface QueryOptions<T extends BaseEntity> extends PaginationOptions {
  search?: string;
  searchFields?: Array<keyof T>;
  filters?: EntityFilters<T>;
  sortBy?: keyof T;
  sortDirection?: SortDirection;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
