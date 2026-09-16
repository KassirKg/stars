import { z } from 'zod';

export interface CreateOrderBody {
  product_id: string | number;
  size: string;
  color_id: string | number | null;
  count: number;
  customer: {
    full_name: string;
    phone: string;
    email: string;
  };
  user_uuid?: string;
}

export const orderResponseSchema = z.object({
  order_id: z.number(),
  order_number: z.string(),
  total: z.number(),
  currency: z.string(),
  payment_url: z.string(),
});

export const orderValidationErrorSchema = z.object({
  message: z.string().optional(),
  errors: z.record(z.string(), z.union([z.string(), z.array(z.string())])).default({}),
});

export type OrderResponse = z.infer<typeof orderResponseSchema>;
export type OrderValidationError = z.infer<typeof orderValidationErrorSchema>;
