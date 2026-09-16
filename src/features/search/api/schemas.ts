import { z } from 'zod';

import { productListItemSchema } from '@/entities/product';
import { artistListItemSchema } from '@/entities/starHuman';

export const searchResultSchema = z.object({
  artists: z.array(artistListItemSchema),
  products: z.array(productListItemSchema),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
