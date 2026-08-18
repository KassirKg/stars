import { z } from 'zod';

import { idSchema, mediaUrlSchema, paginatedSchema } from '@/shared/api';

/** Элемент сетки звёзд — общий для пп. 2, 7 и 9. */
export const artistListItemSchema = z.object({
  id: idSchema,
  /** уникальный, идёт в URL /star/{slug} */
  slug: z.string(),
  name: z.string(),
  /** короткое описание, ориентир до 60 символов */
  description: z.string(),
  /** обложка, вертикальная; приходит относительным путём */
  image: mediaUrlSchema,
  /** ед. число: «Певец» — бейдж на карточке */
  category_name: z.string(),
});

export const artistListSchema = paginatedSchema(artistListItemSchema);

/** Карточка звезды (п. 4) — шапка страницы артиста. */
export const artistDetailSchema = z.object({
  id: idSchema,
  slug: z.string(),
  /** заголовок страницы */
  name: z.string(),
  /** постер */
  image: mediaUrlSchema,
  /** slug категории */
  category: z.string(),
  /** ед. число: «Певец» */
  category_name: z.string(),
  /** выводится как «19 товаров» */
  products_count: z.number(),
  /** выводится как «200000 подписчиков» */
  subscribers_count: z.number(),
  /** развёрнутое описание, plain text */
  description: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type ArtistListItem = z.infer<typeof artistListItemSchema>;
export type ArtistList = z.infer<typeof artistListSchema>;
export type ArtistDetail = z.infer<typeof artistDetailSchema>;
