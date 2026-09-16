import { apiCall, httpWithLocale, revalidate, unwrapPayload } from '@/shared/api';

import { type AllProductsParams, type ArtistProductsParams } from './params';
import {
  productDetailSchema,
  productListSchema,
  type ProductDetail,
  type ProductList,
} from './schemas';

export const fetchAllProducts = async (
  locale: string,
  params: AllProductsParams = {},
): Promise<ProductList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/all-products', {
      query: { ...params },
      next: { revalidate: revalidate.list },
    });
    return productListSchema.parse(unwrapPayload(raw));
  });

export const fetchProduct = async (locale: string, slug: string): Promise<ProductDetail> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(`/product/${encodeURIComponent(slug)}`, {
      next: { revalidate: revalidate.detail },
    });
    return productDetailSchema.parse(unwrapPayload(raw));
  });

export const fetchArtistProducts = async (
  locale: string,
  slug: string,
  params: ArtistProductsParams = {},
): Promise<ProductList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(
      `/artist/${encodeURIComponent(slug)}/products`,
      { query: { ...params } },
    );
    return productListSchema.parse(unwrapPayload(raw));
  });
