import { type AllArtistsParams, type ArtistsByCategoryParams } from './params';

export const artistKeys = {
  all: ['artists'] as const,
  detail: (locale: string, slug: string) => [...artistKeys.all, 'detail', locale, slug] as const,
  list: (locale: string, params: AllArtistsParams = {}) =>
    [...artistKeys.all, 'list', locale, params] as const,
  byCategory: (locale: string, slug: string, params: ArtistsByCategoryParams = {}) =>
    [...artistKeys.all, 'by-category', locale, slug, params] as const,
};
