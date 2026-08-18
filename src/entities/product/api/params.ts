import { type PaginationParams } from '@/shared/api';

export type ProductSort = 'new' | 'price_asc' | 'price_desc' | 'popular';

/** Query-параметры GET api/all-products (п. 3). */
export interface AllProductsParams extends PaginationParams {
  /**
   * slug артиста. Задан — уходим на выделенный эндпоинт
   * api/artist/{slug}/products (п. 5) вместо общего списка.
   */
  artist?: string;
  /** поиск по названию товара */
  query?: string;
  /** по умолчанию new */
  sort?: ProductSort;
}

/** GET api/artist/{slug}/products (п. 5) — без поиска, sort без popular. */
export interface ArtistProductsParams extends PaginationParams {
  sort?: Exclude<ProductSort, 'popular'>;
}
