import { cache } from 'react';

import { notFound } from 'next/navigation';

import { setRequestLocale } from 'next-intl/server';

import { ProductSlider } from '@/entities/banner';
import { fetchProduct } from '@/entities/product/server';
import { ApiError } from '@/shared/api';
import { decodeRouteParam } from '@/shared/lib';
import { assertLocale } from '@/shared/lib/i18n';
import { AsideBar } from '@/widgets/asideBar';
import { ProductInfo } from '@/widgets/productInfo';

import styles from './ProductPage.module.scss';

import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** cache() дедуплицирует запрос между generateMetadata и страницей. */
const getProduct = cache(async (locale: string, slug: string) => {
  try {
    return await fetchProduct(locale, slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
});

export const generateMetadata = async ({ params }: ProductPageProps): Promise<Metadata> => {
  const { locale, slug: rawSlug } = await params;
  const slug = decodeRouteParam(rawSlug);

  const product = await getProduct(locale, slug);
  // notFound() здесь, а не только в теле: статус ответа задаётся до стриминга
  if (!product) notFound();

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.length ? [product.images[0]!] : undefined,
    },
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { locale, slug: rawSlug } = await params;
  const slug = decodeRouteParam(rawSlug);
  assertLocale(locale);
  setRequestLocale(locale);

  const product = await getProduct(locale, slug);
  if (!product) notFound();

  return (
    <div className={styles.root}>
      <AsideBar title={product.title} image={product.images[0] ?? ''} />

      <section className={styles.hero}>
        <ProductSlider images={product.images} />

        <ProductInfo
          id={product.id}
          title={product.title}
          author={product.author}
          price={product.price}
          currency={product.currency}
          description={product.description}
          sizes={product.sizes}
          colors={product.colors ?? []}
          stock={product.stock}
        />
      </section>
    </div>
  );
};

export default ProductPage;
