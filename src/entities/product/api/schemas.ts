import { z } from 'zod';

import { idSchema, mediaUrlSchema, paginatedSchema } from '@/shared/api';

/** Элемент сетки товаров — общий для пп. 3, 5 и 7. */
export const productListItemSchema = z.object({
  id: idSchema,
  /** уникальный, идёт в URL /product/{slug} */
  slug: z.string(),
  title: z.string(),
  price: z.number(),
  /** KGS | UZS | TJS */
  currency: z.string(),
  /** превью; приходит относительным путём */
  image: mediaUrlSchema,
  /** бейдж «new» на карточке */
  is_new: z.boolean(),
  /** артист-владелец товара */
  author: z.string(),
});

export const productListSchema = paginatedSchema(productListItemSchema);

export const productSizeSchema = z.object({
  /** «XS», «S», «M», «L», «XL» */
  value: z.string(),
  available: z.boolean(),
});

export const productColorSchema = z.object({
  id: idSchema,
  /** «Чёрный» */
  name: z.string(),
  /** «#000000» */
  hex: z.string(),
  available: z.boolean(),
});

/** Карточка товара (п. 6). */
export const productDetailSchema = z.object({
  id: idSchema,
  title: z.string(),
  /** цена за 1 шт */
  price: z.number(),
  /** KGS | UZS | TJS */
  currency: z.string(),
  /** текст блока «Описание» */
  description: z.string(),
  /** все изображения для слайдера, минимум 1 */
  images: z.array(mediaUrlSchema),
  sizes: z.array(productSizeSchema),
  /**
   * По спеке поле необязательное: может отсутствовать, прийти null или пустым
   * массивом. .default() ловит только undefined, поэтому null сводим сами —
   * наружу всегда отдаём массив.
   */
  colors: z
    .array(productColorSchema)
    .nullish()
    .transform((value) => value ?? []),
  /** остаток, выводится как «Осталось 2300 товаров» */
  stock: z.number(),
  author: z.string(),
});

export type ProductListItem = z.infer<typeof productListItemSchema>;
export type ProductList = z.infer<typeof productListSchema>;
export type ProductSize = z.infer<typeof productSizeSchema>;
export type ProductColor = z.infer<typeof productColorSchema>;
export type ProductDetail = z.infer<typeof productDetailSchema>;
