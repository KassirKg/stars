import { z } from 'zod';

import { env } from '@/shared/config';

/**
 * Бэкенд отдаёт id строковыми UUID, хотя в спеке значится int.
 * Принимаем оба варианта и приводим к строке — id используется только
 * как ключ списка и как значение в теле заказа.
 */
export const idSchema = z.union([z.string(), z.number()]).transform(String);

const apiOrigin = env.NEXT_PUBLIC_BASE_API_URL.replace(/\/$/, '');

/** Картинки приходят относительными путями вида /uploads/xxx.png. */
export const toMediaUrl = (value: string): string => {
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  return `${apiOrigin}${value.startsWith('/') ? '' : '/'}${value}`;
};

export const mediaUrlSchema = z.string().transform(toMediaUrl);

/** meta одинаковая у всех списочных эндпоинтов (пп. 2, 3, 5, 9). */
export const paginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  per_page: z.number(),
  last_page: z.number(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    meta: paginationMetaSchema,
  });

/** Общие query-параметры постраничных списков. */
export interface PaginationParams {
  page?: number;
  per_page?: number;
}
