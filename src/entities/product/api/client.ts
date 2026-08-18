'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { fetchAllProducts, fetchArtistProducts } from './fetcher';
import { productKeys } from './keys';
import { type AllProductsParams, type ArtistProductsParams } from './params';
import { type ProductList } from './schemas';

/** Общий список товаров — п. 3. */
export const useProducts = (params: AllProductsParams = {}) => {
  const locale = useLocale();

  return useQuery<ProductList>({
    queryKey: productKeys.list(locale, params),
    queryFn: () => fetchAllProducts(locale, params),
  });
};

/** Товары конкретной звезды — п. 5, выделенный эндпоинт. */
export const useArtistProducts = (slug: string, params: ArtistProductsParams = {}) => {
  const locale = useLocale();

  return useQuery<ProductList>({
    queryKey: productKeys.byArtist(locale, slug, params),
    queryFn: () => fetchArtistProducts(locale, slug, params),
  });
};
