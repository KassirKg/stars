import { COUNTRY_ALIASES } from './countries';
import { env } from './env';

export interface CurrencyConfig {
  code: 'KGS' | 'TJS' | 'RUB' | 'UZS';
  label: string;
}

const BY_COUNTRY: Record<string, CurrencyConfig> = {
  kg: { code: 'KGS', label: 'сом' },
  tj: { code: 'TJS', label: 'сомони' },
  ru: { code: 'RUB', label: '₽' },
  uz: { code: 'UZS', label: 'сум' },
};

const pick = (): CurrencyConfig => {
  const code = env.NEXT_PUBLIC_COUNTRY_CODE;
  const resolved = COUNTRY_ALIASES[code] ?? code;
  return BY_COUNTRY[resolved] ?? BY_COUNTRY.kg!;
};

export const currency: CurrencyConfig = pick();

const LABEL_BY_CODE: Record<string, string> = {
  KGS: 'сом',
  TJS: 'сомони',
  RUB: '₽',
  UZS: 'сум',
};

/** Подпись валюты: из кода API (KGS | UZS | TJS), иначе валюта витрины из env. */
export const currencyLabel = (code?: string): string =>
  (code ? LABEL_BY_CODE[code] : undefined) ?? currency.label;

/**
 * `code` приходит из API вместе с ценой (KGS | UZS | TJS).
 * Без него берём валюту витрины из env.
 */
export const formatPrice = (value: number, code?: string): string =>
  `${value.toLocaleString()} ${currencyLabel(code)}`;
