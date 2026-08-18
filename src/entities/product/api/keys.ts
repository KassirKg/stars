import { type AllProductsParams, type ArtistProductsParams } from './params';

export const productKeys = {
  all: ['products'] as const,
  detail: (locale: string, slug: string) => [...productKeys.all, 'detail', locale, slug] as const,
  list: (locale: string, params: AllProductsParams = {}) =>
    [...productKeys.all, 'list', locale, params] as const,
  byArtist: (locale: string, slug: string, params: ArtistProductsParams = {}) =>
    [...productKeys.all, 'by-artist', locale, slug, params] as const,
};
