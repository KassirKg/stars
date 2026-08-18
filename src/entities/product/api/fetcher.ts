import { apiCall, httpWithLocale, unwrapPayload } from '@/shared/api';

import { type AllProductsParams, type ArtistProductsParams } from './params';
import {
  productDetailSchema,
  productListSchema,
  type ProductDetail,
  type ProductList,
} from './schemas';

/** GET api/all-products — сетка товаров на главной и в каталоге. */
export const fetchAllProducts = async (
  locale: string,
  params: AllProductsParams = {},
): Promise<ProductList> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/all-products', { query: { ...params } });
    return productListSchema.parse(unwrapPayload(raw));
  });

/** GET api/product/{slug} — страница товара. Не найден — ApiError 404. */
export const fetchProduct = async (locale: string, slug: string): Promise<ProductDetail> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>(`/product/${encodeURIComponent(slug)}`);
    return productDetailSchema.parse(unwrapPayload(raw));
  });

/**
 * GET api/artist/{slug}/products — блок «Товары звезды».
 * Формат элемента и meta совпадают с п. 3.
 */
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
