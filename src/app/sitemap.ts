import { fetchAllProducts } from '@/entities/product/server';
import { fetchAllArtists } from '@/entities/starHuman/server';
import { env } from '@/shared/config/env';
import { LEGAL_SLUGS } from '@/shared/content/legal';
import { routing } from '@/shared/lib/i18n/routing';

import type { MetadataRoute } from 'next';

export const revalidate = 3600;

const MAX_PAGES = 20;
const PER_PAGE = 100;

const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');

const localeUrl = (locale: string, path: string): string => {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const tail = path === '/' ? '' : path;

  const url = `${base}${prefix}${tail}`;

  return url === base ? `${base}/` : url;
};

const entry = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap[number] => ({
  url: localeUrl(routing.defaultLocale, path),
  lastModified: new Date(),
  changeFrequency,
  priority,
  alternates: {
    languages: Object.fromEntries(routing.locales.map((l) => [l, localeUrl(l, path)])),
  },
});

type Paged<T> = { items: T[]; meta: { last_page: number } };

const collect = async <T>(load: (page: number) => Promise<Paged<T>>): Promise<T[]> => {
  let first: Paged<T>;

  try {
    first = await load(1);
  } catch {
    return [];
  }

  const pages = Math.min(first.meta.last_page, MAX_PAGES);
  const rest = await Promise.all(
    Array.from({ length: Math.max(pages - 1, 0) }, (_, i) =>
      load(i + 2)
        .then((page) => page.items)
        .catch(() => []),
    ),
  );

  return [first.items, ...rest].flat();
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const locale = routing.defaultLocale;

  const [artists, products] = await Promise.all([
    collect((page) => fetchAllArtists(locale, { page, per_page: PER_PAGE })),
    collect((page) => fetchAllProducts(locale, { page, per_page: PER_PAGE })),
  ]);

  return [
    entry('/', 1, 'daily'),
    entry('/allStars', 0.8, 'daily'),
    entry('/catalog', 0.8, 'daily'),
    ...LEGAL_SLUGS.map((slug) => entry(`/${slug}`, 0.3, 'yearly')),
    ...artists.map((artist) => entry(`/star/${encodeURIComponent(artist.slug)}`, 0.7, 'weekly')),
    ...products.map((product) =>
      entry(`/product/${encodeURIComponent(product.slug)}`, 0.6, 'weekly'),
    ),
  ];
};

export default sitemap;
