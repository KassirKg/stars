import { z } from 'zod';

import { idSchema, mediaUrlSchema, paginatedSchema } from '@/shared/api';

export const artistListItemSchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: mediaUrlSchema,
  category_name: z.string(),
});

export const artistListSchema = paginatedSchema(artistListItemSchema);

export const artistDetailSchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  image: mediaUrlSchema,
  category: z.string(),
  category_name: z.string(),
  products_count: z.number(),
  subscribers_count: z.number(),
  description: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type ArtistListItem = z.infer<typeof artistListItemSchema>;
export type ArtistList = z.infer<typeof artistListSchema>;
export type ArtistDetail = z.infer<typeof artistDetailSchema>;
