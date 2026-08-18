import { apiCall, httpWithLocale, unwrapPayload } from '@/shared/api';

import { artistCategoriesSchema, type ArtistCategory } from './schemas';

/**
 * GET api/artist-categories — категории для фильтра над сеткой звёзд.
 * Порядок элементов = порядок кнопок на экране, поэтому не сортируем.
 * Изоморфна: вызывается и из RSC (префетч), и из клиентского хука.
 */
export const fetchArtistCategories = async (locale: string): Promise<ArtistCategory[]> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/artist-categories');
    return artistCategoriesSchema.parse(unwrapPayload(raw));
  });
