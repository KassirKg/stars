export const ALL_CATEGORIES = 'all';

export const CATEGORY_PARAM = 'category';

export const categoryFromParam = (value?: string | string[]): string =>
  typeof value === 'string' && value.trim() ? value : ALL_CATEGORIES;
