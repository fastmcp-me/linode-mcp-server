// Common parameter and response types
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pages: number;
  results: number;
}
