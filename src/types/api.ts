export interface PaginationMetaDto {
  count: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMetaDto;
  message: string;
  statusCode: number;
  success: boolean;
} 