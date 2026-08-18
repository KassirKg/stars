import { notFound } from 'next/navigation';

import { routing, type AppLocale } from './routing';

export const isAppLocale = (value: string): value is AppLocale =>
  (routing.locales as readonly string[]).includes(value);

/**
 * Сегмент [locale] матчит вообще любой путь верхнего уровня — /favicon.ico,
 * опечатки, запросы ботов. Layout и page Next рендерит параллельно, поэтому
 * одного notFound() в layout мало: страница успевает сходить в API с мусорной
 * локалью. Гард нужен и в самой странице, до любых запросов.
 */
export const assertLocale = (locale: string): AppLocale => {
  if (!isAppLocale(locale)) notFound();
  return locale;
};
