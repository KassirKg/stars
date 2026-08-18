import { z } from 'zod';

import { idSchema } from '@/shared/api';

export const artistCategorySchema = z.object({
  id: idSchema,
  slug: z.string(),
  /** множественное число — подпись кнопки фильтра: «Певцы» */
  name: z.string(),
  /** единственное число — бейдж на карточке звезды: «Певец» */
  name_single: z.string(),
  /** сколько артистов в категории */
  count: z.number(),
});

export const artistCategoriesSchema = z.array(artistCategorySchema);

export type ArtistCategory = z.infer<typeof artistCategorySchema>;
