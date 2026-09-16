import 'server-only';

import { type QueryClient } from '@tanstack/react-query';

import { ALL_CATEGORIES } from '@/shared/model';

import { fetchAllArtists, fetchArtistsByCategory } from './fetcher';
import { artistKeys } from './keys';

export const prefetchArtists = (queryClient: QueryClient, locale: string, category: string) => {
  const isAll = category === ALL_CATEGORIES;

  return queryClient.prefetchQuery({
    queryKey: isAll ? artistKeys.list(locale) : artistKeys.byCategory(locale, category),
    queryFn: () => (isAll ? fetchAllArtists(locale) : fetchArtistsByCategory(locale, category)),
  });
};
