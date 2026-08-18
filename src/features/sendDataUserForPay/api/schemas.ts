import { z } from 'zod';

/** Body POST api/order (п. 8). Сумму считает бэкенд. */
export interface CreateOrderBody {
  /** бэкенд отдаёт UUID-строки, хотя в спеке int — шлём как пришло */
  product_id: string | number;
  /** значение из sizes[].value */
  size: string;
  /** id из colors[]; null — у товара нет цветов */
  color_id: string | number | null;
  /** >= 1 */
  count: number;
  customer: {
    full_name: string;
    /** 9 цифр без кода страны */
    phone: string;
    email: string;
  };
  /** анонимный id пользователя, необязателен */
  user_uuid?: string;
}

export const orderResponseSchema = z.object({
  order_id: z.number(),
  order_number: z.string(),
  /** итоговая сумма */
  total: z.number(),
  currency: z.string(),
  /** ссылка на оплату */
  payment_url: z.string(),
});

/** Тело ответа 422: ключ errors = имя поля из body, например «customer.phone». */
export const orderValidationErrorSchema = z.object({
  message: z.string().optional(),
  errors: z.record(z.string(), z.union([z.string(), z.array(z.string())])).default({}),
});

export type OrderResponse = z.infer<typeof orderResponseSchema>;
export type OrderValidationError = z.infer<typeof orderValidationErrorSchema>;
