import { apiCall, httpWithLocale, revalidate, unwrapPayload } from '@/shared/api';

import { artistCategoriesSchema, type ArtistCategory } from './schemas';

export const fetchArtistCategories = async (locale: string): Promise<ArtistCategory[]> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/artist-categories', {
      next: { revalidate: revalidate.reference },
    });
    return artistCategoriesSchema.parse(unwrapPayload(raw));
  });
