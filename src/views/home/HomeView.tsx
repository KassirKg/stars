import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import { Loader } from '@/shared/ui';
import { MobileSearch } from '@/widgets/header';

import styles from './HomeView.module.scss';
import { type HomeViewProps } from './HomeView.types';
import { HomeBanners } from './ui/HomeBanners';
import { HomeProducts } from './ui/HomeProducts';
import { HomeStars } from './ui/HomeStars';

/**
 * Запросы живут внутри секций, а не здесь: иначе страница ждала бы их все
 * до первого байта и Suspense ничего бы не дал. Границы стоят ниже роута,
 * поэтому на HTTP-статус они не влияют — в отличие от общего loading.tsx.
 */
export const HomeView = async ({ locale }: HomeViewProps) => {
  const t = await getTranslations();

  return (
    <div className={styles.root}>
      <MobileSearch />

      <Suspense fallback={null}>
        <HomeBanners locale={locale} />
      </Suspense>

      <h2 className={styles.title}>{t('homePage.stars')}</h2>
      <Suspense fallback={<Loader size="lg" ariaLabel={t('common.loading')} />}>
        <HomeStars locale={locale} />
      </Suspense>

      <h2 className={styles.title}>{t('homePage.products')}</h2>
      <Suspense fallback={<Loader size="lg" ariaLabel={t('common.loading')} />}>
        <HomeProducts locale={locale} />
      </Suspense>
    </div>
  );
};
