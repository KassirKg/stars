import { apiCall, httpWithLocale, unwrapPayload } from '@/shared/api';

import { type SearchParams } from './params';
import { searchResultSchema, type SearchResult } from './schemas';

export const fetchSearch = async (locale: string, params: SearchParams): Promise<SearchResult> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/search', { query: { ...params } });
    return searchResultSchema.parse(unwrapPayload(raw));
  });
