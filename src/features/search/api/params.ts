export type SearchType = 'all' | 'artists' | 'products';

export interface SearchParams {
  query: string;
  limit?: number;
  type?: SearchType;
}
