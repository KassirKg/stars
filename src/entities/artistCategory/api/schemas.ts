import { z } from 'zod';

import { idSchema } from '@/shared/api';

export const artistCategorySchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  name_single: z.string(),
  count: z.number(),
});

export const artistCategoriesSchema = z.array(artistCategorySchema);

export type ArtistCategory = z.infer<typeof artistCategorySchema>;
