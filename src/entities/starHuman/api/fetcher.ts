import { apiCall, httpWithLocale, revalidate, unwrapPayload } from '@/shared/api';

import { type AllArtistsParams, type ArtistsByCategoryParams } from './params';
import {
  artistDetailSchema,
  artistListSchema,
  type ArtistDetail,
  type ArtistList,
} from './schemas';

export const fetchAllArtists = async (
  locale: string,
  params: AllArtistsParams = {},
): Promise<ArtistList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/all-artists', {
      query: { ...params },
      next: { revalidate: revalidate.list },
    });
    return artistListSchema.parse(unwrapPayload(raw));
  });

export const fetchArtist = async (locale: string, slug: string): Promise<ArtistDetail> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(`/artist/${encodeURIComponent(slug)}`, {
      next: { revalidate: revalidate.detail },
    });
    return artistDetailSchema.parse(unwrapPayload(raw));
  });

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
