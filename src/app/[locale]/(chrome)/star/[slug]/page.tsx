import { cache } from 'react';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Crown, Package, Users } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { fetchArtistProducts, productKeys } from '@/entities/product/server';
import { fetchArtist } from '@/entities/starHuman/server';
import { ApiError, getQueryClient } from '@/shared/api';
import { brand } from '@/shared/config';
import { decodeRouteParam } from '@/shared/lib';
import { assertLocale } from '@/shared/lib/i18n';
import { ProductsList } from '@/widgets/productsList';

import styles from './StarPage.module.scss';

import type { Metadata } from 'next';

interface StarPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const getArtist = cache(async (locale: string, slug: string) => {
  try {
    return await fetchArtist(locale, slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
});

export const generateMetadata = async ({ params }: StarPageProps): Promise<Metadata> => {
  const { locale, slug: rawSlug } = await params;
  const slug = decodeRouteParam(rawSlug);

  const artist = await getArtist(locale, slug);
  if (!artist) notFound();

  return {
    title: artist.seo.title,
    description: artist.seo.description,
    openGraph: {
      siteName: brand.appName,
      title: artist.seo.title,
      description: artist.seo.description,
      images: artist.image ? [artist.image] : undefined,
    },
  };
};

const StarPage = async ({ params }: StarPageProps) => {
  const { locale, slug: rawSlug } = await params;
  const slug = decodeRouteParam(rawSlug);
  assertLocale(locale);
  setRequestLocale(locale);

  const queryClient = getQueryClient();

  const [artist, t] = await Promise.all([
    getArtist(locale, slug),
    getTranslations(),
    queryClient.prefetchQuery({
      queryKey: productKeys.byArtist(locale, slug),
      queryFn: () => fetchArtistProducts(locale, slug),
    }),
  ]);

  if (!artist) notFound();

  return (
    <div className={styles.root}>
      <section className={styles.hero}>
        <div className={styles.posterWrap}>
          {artist.image ? (
            <Image
              src={artist.image}
              alt={artist.name}
              width={600}
              height={500}
              className={styles.poster}
              priority
            />
          ) : null}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{artist.name}</h1>

          <div className={styles.typeBadge}>
            <Crown size={18} />
            {artist.category_name}
          </div>

          <div className={styles.products}>
            <Package size={18} />
            {artist.products_count} {t('products')}
          </div>

          <div className={styles.subscribes}>
            <Users size={18} /> {artist.subscribers_count} {t('subscribes')}
          </div>

          <div className={styles.description}>{artist.description}</div>
        </div>
      </section>

      <h2 className={styles.title}>{t('artistsProductsTitle')}</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsList artist={slug} />
      </HydrationBoundary>
    </div>
  );
};

export default StarPage;
