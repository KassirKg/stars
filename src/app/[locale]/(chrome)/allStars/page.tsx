import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { fetchArtistCategories, artistCategoryKeys } from '@/entities/artistCategory/server';
import { prefetchArtists } from '@/entities/starHuman/server';
import { FilterArtistsList } from '@/features/filterArtists';
import { getQueryClient } from '@/shared/api';
import { brand } from '@/shared/config';
import { assertLocale } from '@/shared/lib/i18n';
import { CATEGORY_PARAM, categoryFromParam } from '@/shared/model';
import { StarsList } from '@/widgets/starsList';

import styles from './AllStars.module.scss';

import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta-data.stars' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/allStars' },
    openGraph: {
      siteName: brand.appName,
      type: 'website',
      title: t('title'),
      description: t('description'),
    },
  };
};

interface AllStarsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const AllStarsPage = async ({ params, searchParams }: AllStarsPageProps) => {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  assertLocale(locale);
  setRequestLocale(locale);

  const category = categoryFromParam(query[CATEGORY_PARAM]);
  const queryClient = getQueryClient();

  const [t] = await Promise.all([
    getTranslations(),
    queryClient.prefetchQuery({
      queryKey: artistCategoryKeys.list(locale),
      queryFn: () => fetchArtistCategories(locale),
    }),
    prefetchArtists(queryClient, locale, category),
  ]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{t('allStarsPageTitle')}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FilterArtistsList selected={category} />
        <StarsList category={category} />
      </HydrationBoundary>
    </div>
  );
};

export default AllStarsPage;
