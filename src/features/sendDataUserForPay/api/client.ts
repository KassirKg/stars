'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { createOrder } from './fetcher';
import { type CreateOrderBody, type OrderResponse } from './schemas';

export const createOrderMutationKey = ['create-order'] as const;

export const useCreateOrder = () => {
  const locale = useLocale();

  return useMutation<OrderResponse, unknown, CreateOrderBody>({
    mutationKey: createOrderMutationKey,
    mutationFn: (body) => createOrder(locale, body),
  });
};
