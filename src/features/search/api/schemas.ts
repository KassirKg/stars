import { z } from 'zod';

import { productListItemSchema } from '@/entities/product';
import { artistListItemSchema } from '@/entities/starHuman';

/**
 * Товары и звёзды приходят одним запросом.
 * Ничего не найдено — 200 и пустые массивы, не 404.
 */
export const searchResultSchema = z.object({
  artists: z.array(artistListItemSchema),
  products: z.array(productListItemSchema),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
