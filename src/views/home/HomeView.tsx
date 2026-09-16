import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import { Loader } from '@/shared/ui';
import { MobileSearch } from '@/widgets/header';

import styles from './HomeView.module.scss';
import { type HomeViewProps } from './HomeView.types';
import { HomeBanners } from './ui/HomeBanners';
import { HomeProducts } from './ui/HomeProducts';
import { HomeStars } from './ui/HomeStars';

export const HomeView = async ({ locale, category }: HomeViewProps) => {
  const t = await getTranslations();

  return (
    <div className={styles.root}>
      <Suspense fallback={null}>
        <HomeBanners locale={locale} />
      </Suspense>

      <MobileSearch />

      <h2 className={styles.title}>{t('homePage.stars')}</h2>
      <Suspense fallback={<Loader size="lg" ariaLabel={t('common.loading')} />}>
        <HomeStars locale={locale} category={category} />
      </Suspense>

      <h2 className={styles.title}>{t('homePage.products')}</h2>
      <Suspense fallback={<Loader size="lg" ariaLabel={t('common.loading')} />}>
        <HomeProducts locale={locale} />
      </Suspense>
    </div>
  );
};
