import { type PaginationParams } from '@/shared/api';

export type ArtistSort = 'popular' | 'name_asc' | 'new';

export interface AllArtistsParams extends PaginationParams {
  query?: string;
  sort?: ArtistSort;
}

export type ArtistsByCategoryParams = PaginationParams;
