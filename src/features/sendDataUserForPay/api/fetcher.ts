import { apiCall, httpWithLocale, unwrapPayload } from '@/shared/api';

import { orderResponseSchema, type CreateOrderBody, type OrderResponse } from './schemas';

/** POST api/order — оформление заказа со страницы товара. */
export const createOrder = async (locale: string, body: CreateOrderBody): Promise<OrderResponse> =>
  apiCall(async () => {
    const raw = await httpWithLocale(locale)<unknown>('/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    return orderResponseSchema.parse(unwrapPayload(raw));
  });
