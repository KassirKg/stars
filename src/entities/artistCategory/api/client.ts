'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { fetchArtistCategories } from './fetcher';
import { artistCategoryKeys } from './keys';
import { type ArtistCategory } from './schemas';

export const useArtistCategories = () => {
  const locale = useLocale();

  return useQuery<ArtistCategory[]>({
    queryKey: artistCategoryKeys.list(locale),
    queryFn: () => fetchArtistCategories(locale),
  });
};
