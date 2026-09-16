export interface CurrencyConfig {
  code: 'KGS' | 'TJS' | 'RUB' | 'UZS';
  label: string;
}

const LABEL_BY_CODE: Record<string, string> = {
  KGS: 'сом',
  TJS: 'сомони',
  RUB: '₽',
  UZS: 'сум',
};

export const currency: CurrencyConfig = { code: 'KGS', label: LABEL_BY_CODE.KGS! };

export const currencyLabel = (code?: string): string =>
  (code ? LABEL_BY_CODE[code] : undefined) ?? currency.label;

export const formatPrice = (value: number, code?: string): string =>
  `${value.toLocaleString()} ${currencyLabel(code)}`;
