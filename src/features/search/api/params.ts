export type SearchType = 'all' | 'artists' | 'products';

/** Query-параметры GET api/search (п. 7). */
export interface SearchParams {
  /** поисковая строка, обязательна */
  query: string;
  /** максимум результатов каждого типа, по умолчанию 8 */
  limit?: number;
  /** по умолчанию all */
  type?: SearchType;
}
