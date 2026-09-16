'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { fetchSearch } from './fetcher';
import { searchKeys } from './keys';
import { type SearchParams } from './params';
import { type SearchResult } from './schemas';

export const useSearch = (query: string, params: Omit<SearchParams, 'query'> = {}) => {
  const locale = useLocale();
  const trimmed = query.trim();

  return useQuery<SearchResult>({
    queryKey: searchKeys.query(locale, { query: trimmed, ...params }),
    queryFn: () => fetchSearch(locale, { query: trimmed, ...params }),
    enabled: trimmed.length > 0,
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
};
