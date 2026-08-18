import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { fetchAllArtists, artistKeys } from '@/entities/starHuman/server';
import { getQueryClient } from '@/shared/api';
import { assertLocale } from '@/shared/lib/i18n';
import { ALL_CATEGORIES } from '@/shared/model';
import { StarsList } from '@/widgets/starsList';

import styles from './AllStars.module.scss';

interface AllStarsPageProps {
  params: Promise<{ locale: string }>;
}

const AllStarsPage = async ({ params }: AllStarsPageProps) => {
  const { locale } = await params;
  assertLocale(locale);
  setRequestLocale(locale);

  const queryClient = getQueryClient();

  const [t] = await Promise.all([
    getTranslations(),
    queryClient.prefetchQuery({
      queryKey: artistKeys.list(locale),
      queryFn: () => fetchAllArtists(locale),
    }),
  ]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{t('allStarsPageTitle')}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* страница «Все звёзды» — фильтр по категории тут не применяется */}
        <StarsList category={ALL_CATEGORIES} />
      </HydrationBoundary>
    </div>
  );
};

export default AllStarsPage;
