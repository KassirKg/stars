import { getBanners } from '@/entities/banner/server';
import { BannersCarousel } from '@/widgets/banners-carousel';

import styles from '../HomeView.module.scss';

export const HomeBanners = async ({ locale }: { locale: string }) => {
  const banners = await getBanners(locale);

  if (!banners.length) return null;

  return (
    <section className={styles.hero}>
      <BannersCarousel banners={banners} />
    </section>
  );
};
