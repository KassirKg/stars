import { ApiError } from '@/shared/api/types';

import { orderValidationErrorSchema } from '../api/schemas';
import { type ISendDataUserForPaySchema } from './schemas/sendDataUserForPaySchema';

type FormField = keyof ISendDataUserForPaySchema;

/** Имена полей из body (п. 8) -> поля формы. */
const FIELD_BY_API_KEY: Record<string, FormField> = {
  'customer.full_name': 'fullName',
  'customer.phone': 'phoneNumber',
  'customer.email': 'email',
};

export interface MappedOrderErrors {
  /** ошибки, которые ложатся на конкретные поля формы */
  fields: Partial<Record<FormField, string>>;
  /** всё остальное (product_id, size, count…) — показываем общим сообщением */
  rest: string[];
}

const firstMessage = (value: string | string[]): string =>
  Array.isArray(value) ? (value[0] ?? '') : value;

/**
 * Разбирает 422 в ошибки формы. Не 422 или неожиданное тело —
 * возвращает пустой результат, вызывающий код покажет общий текст.
 */
export const mapOrderErrors = (error: unknown): MappedOrderErrors => {
  const empty: MappedOrderErrors = { fields: {}, rest: [] };

  if (!(error instanceof ApiError) || error.status !== 422) return empty;

  const parsed = orderValidationErrorSchema.safeParse(error.details);
  if (!parsed.success) return empty;

  const result: MappedOrderErrors = { fields: {}, rest: [] };

  for (const [key, value] of Object.entries(parsed.data.errors)) {
    const message = firstMessage(value);
    if (!message) continue;

    const field = FIELD_BY_API_KEY[key];
    if (field) result.fields[field] = message;
    else result.rest.push(message);
  }

  return result;
};
