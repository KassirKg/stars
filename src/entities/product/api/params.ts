import { type PaginationParams } from '@/shared/api';

export type ProductSort = 'new' | 'price_asc' | 'price_desc' | 'popular';

export interface AllProductsParams extends PaginationParams {
  artist?: string;
  query?: string;
  sort?: ProductSort;
}

export interface ArtistProductsParams extends PaginationParams {
  sort?: Exclude<ProductSort, 'popular'>;
}
