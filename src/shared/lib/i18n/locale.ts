import { notFound } from 'next/navigation';

import { routing, type AppLocale } from './routing';

export const isAppLocale = (value: string): value is AppLocale =>
  (routing.locales as readonly string[]).includes(value);

export const assertLocale = (locale: string): AppLocale => {
  if (!isAppLocale(locale)) notFound();
  return locale;
};
