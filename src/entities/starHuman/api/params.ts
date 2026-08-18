import { type PaginationParams } from '@/shared/api';

export type ArtistSort = 'popular' | 'name_asc' | 'new';

/** Query-параметры GET api/all-artists (п. 2). */
export interface AllArtistsParams extends PaginationParams {
  /** slug категории. Не передан — выборка без фильтра */
  category?: string;
  /** поиск по имени внутри списка */
  query?: string;
  /** по умолчанию popular */
  sort?: ArtistSort;
}

/** GET api/artist-categories/{slug} (п. 9) — только постранично. */
export type ArtistsByCategoryParams = PaginationParams;
