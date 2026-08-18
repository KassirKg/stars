import { type SearchParams } from './params';

export const searchKeys = {
  all: ['search'] as const,
  query: (locale: string, params: SearchParams) => [...searchKeys.all, locale, params] as const,
};
