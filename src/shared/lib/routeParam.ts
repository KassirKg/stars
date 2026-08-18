/**
 * Next отдаёт значения динамических сегментов percent-encoded.
 * Фетчеры сами оборачивают slug в encodeURIComponent, поэтому без раскодирования
 * получалось двойное кодирование (%D1%83 -> %25D1%2583) и 404 от бэкенда.
 * Слаги у нас кириллические, так что это не теория.
 */
export const decodeRouteParam = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    // сегмент с одиночным «%» — оставляем как есть, лишь бы не падать
    return value;
  }
};
