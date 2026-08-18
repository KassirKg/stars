import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { fetchAllProducts, productKeys } from '@/entities/product/server';
import { getQueryClient } from '@/shared/api';
import { assertLocale } from '@/shared/lib/i18n';
import { ProductsList } from '@/widgets/productsList';

import styles from './CatalogPage.module.scss';

interface CatalogPageProps {
  params: Promise<{ locale: string }>;
}

const CatalogPage = async ({ params }: CatalogPageProps) => {
  const { locale } = await params;
  assertLocale(locale);
  setRequestLocale(locale);

  const queryClient = getQueryClient();

  const [t] = await Promise.all([
    getTranslations(),
    queryClient.prefetchQuery({
      queryKey: productKeys.list(locale),
      queryFn: () => fetchAllProducts(locale),
    }),
  ]);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{t('catalogPageTitle')}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsList />
      </HydrationBoundary>
    </div>
  );
};

export default CatalogPage;
