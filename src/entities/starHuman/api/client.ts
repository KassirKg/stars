'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { ALL_CATEGORIES } from '@/shared/model';

import { fetchAllArtists, fetchArtistsByCategory } from './fetcher';
import { artistKeys } from './keys';
import { type AllArtistsParams } from './params';
import { type ArtistList } from './schemas';

export const useArtists = (category: string = ALL_CATEGORIES, params: AllArtistsParams = {}) => {
  const locale = useLocale();
  const isAll = category === ALL_CATEGORIES;

  return useQuery<ArtistList>({
    queryKey: isAll
      ? artistKeys.list(locale, params)
      : artistKeys.byCategory(locale, category, params),
    queryFn: () =>
      isAll ? fetchAllArtists(locale, params) : fetchArtistsByCategory(locale, category, params),
  });
};
