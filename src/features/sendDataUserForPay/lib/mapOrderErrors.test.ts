import { describe, expect, it } from 'vitest';

import { ApiError } from '@/shared/api/types';

import { mapOrderErrors } from './mapOrderErrors';

const validationError = (errors: Record<string, string | string[]>) =>
  new ApiError(422, 'Проверьте данные', undefined, { message: 'Проверьте данные', errors });

describe('mapOrderErrors', () => {
  it('раскладывает ключи body по полям формы', () => {
    const result = mapOrderErrors(
      validationError({
        'customer.full_name': 'Укажите имя',
        'customer.phone': 'Неверный номер',
        'customer.email': 'Занят',
      }),
    );

    expect(result.fields).toEqual({
      fullName: 'Укажите имя',
      phoneNumber: 'Неверный номер',
      email: 'Занят',
    });
    expect(result.rest).toEqual([]);
  });

  it('ключи вне формы уходят в rest', () => {
    const result = mapOrderErrors(
      validationError({ count: 'Мало товара', 'customer.phone': 'Неверный номер' }),
    );

    expect(result.fields).toEqual({ phoneNumber: 'Неверный номер' });
    expect(result.rest).toEqual(['Мало товара']);
  });

  it('берёт первое сообщение, если пришёл массив', () => {
    const result = mapOrderErrors(
      validationError({ 'customer.phone': ['Слишком короткий', 'ещё'] }),
    );

    expect(result.fields.phoneNumber).toBe('Слишком короткий');
  });

  it('не 422 — ничего не раскладывает', () => {
    expect(mapOrderErrors(new ApiError(500, 'Boom'))).toEqual({ fields: {}, rest: [] });
  });

  it('произвольная ошибка не роняет разбор', () => {
    expect(mapOrderErrors(new Error('network'))).toEqual({ fields: {}, rest: [] });
    expect(mapOrderErrors(undefined)).toEqual({ fields: {}, rest: [] });
  });

  it('422 с неожиданным телом не роняет разбор', () => {
    expect(mapOrderErrors(new ApiError(422, 'oops', undefined, 'не объект'))).toEqual({
      fields: {},
      rest: [],
    });
  });

  it('реальный 422 боевого бэкенда: пустое тело', () => {
    // POST /api/order с {} — ответ снят с https://stars-api.kassir.kg
    const result = mapOrderErrors(
      validationError({
        product_id: 'required',
        count: 'must be an integer >= 1',
        'customer.full_name': 'required',
        'customer.phone': '9 digits without country code',
        'customer.email': 'invalid e-mail',
      }),
    );

    expect(result.fields).toEqual({
      fullName: 'required',
      phoneNumber: '9 digits without country code',
      email: 'invalid e-mail',
    });
    expect(result.rest).toEqual(['required', 'must be an integer >= 1']);
  });

  it('реальный 422: товар не найден — уходит в общее сообщение', () => {
    const result = mapOrderErrors(validationError({ product_id: 'product not found' }));

    expect(result.fields).toEqual({});
    expect(result.rest).toEqual(['product not found']);
  });

  it('пустые сообщения пропускаются', () => {
    const result = mapOrderErrors(validationError({ 'customer.phone': '', count: [] }));

    expect(result).toEqual({ fields: {}, rest: [] });
  });
});
