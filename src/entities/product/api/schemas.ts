import { z } from 'zod';

import { idSchema, mediaUrlSchema, paginatedSchema } from '@/shared/api';

export const productListItemSchema = z.object({
  id: idSchema,
  slug: z.string(),
  title: z.string(),
  price: z.number(),
  currency: z.string(),
  image: mediaUrlSchema,
  is_new: z.boolean(),
  author: z.string(),
});

export const productListSchema = paginatedSchema(productListItemSchema);

export const productSizeSchema = z.object({
  value: z.string(),
  available: z.boolean(),
});

export const productColorSchema = z.object({
  id: idSchema,
  name: z.string(),
  hex: z.string(),
  available: z.boolean(),
});

export const productDetailSchema = z.object({
  id: idSchema,
  title: z.string(),
  price: z.number(),
  currency: z.string(),
  description: z.string(),
  images: z.array(mediaUrlSchema),
  sizes: z.array(productSizeSchema),
  colors: z
    .array(productColorSchema)
    .nullish()
    .transform((value) => value ?? []),
  stock: z.number(),
  author: z.string(),
});

export type ProductListItem = z.infer<typeof productListItemSchema>;
export type ProductList = z.infer<typeof productListSchema>;
export type ProductSize = z.infer<typeof productSizeSchema>;
export type ProductColor = z.infer<typeof productColorSchema>;
export type ProductDetail = z.infer<typeof productDetailSchema>;
