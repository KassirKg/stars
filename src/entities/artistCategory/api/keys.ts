export const artistCategoryKeys = {
  all: ['artist-categories'] as const,
  list: (locale: string) => [...artistCategoryKeys.all, locale] as const,
};
