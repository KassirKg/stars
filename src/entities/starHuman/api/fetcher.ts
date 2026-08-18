import { apiCall, httpWithLocale, unwrapPayload } from '@/shared/api';

import { type AllArtistsParams, type ArtistsByCategoryParams } from './params';
import {
  artistDetailSchema,
  artistListSchema,
  type ArtistDetail,
  type ArtistList,
} from './schemas';

/** GET api/all-artists — общий список звёзд: главная и страница «Все звёзды». */
export const fetchAllArtists = async (
  locale: string,
  params: AllArtistsParams = {},
): Promise<ArtistList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/all-artists', { query: { ...params } });
    return artistListSchema.parse(unwrapPayload(raw));
  });

/**
 * GET api/artist/{slug} — шапка страницы артиста.
 * Товары приходят отдельным запросом (п. 5). Артист не найден — ApiError 404.
 */
export const fetchArtist = async (locale: string, slug: string): Promise<ArtistDetail> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(`/artist/${encodeURIComponent(slug)}`);
    return artistDetailSchema.parse(unwrapPayload(raw));
  });

/**
 * GET api/artist-categories/{slug} — артисты выбранной категории.
 * Фильтрация целиком на бэкенде: клиент только передаёт slug.
 */
export const fetchArtistsByCategory = async (
  locale: string,
  slug: string,
  params: ArtistsByCategoryParams = {},
): Promise<ArtistList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(
      `/artist-categories/${encodeURIComponent(slug)}`,
      { query: { ...params } },
    );
    return artistListSchema.parse(unwrapPayload(raw));
  });
