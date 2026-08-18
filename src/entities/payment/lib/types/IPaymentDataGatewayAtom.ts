export interface IPaymentDataGatewayAtom {
  /** product_id для POST api/order */
  id: string | number;
  size?: string;
  /** id из colors[]; null — у товара нет цветов */
  colorId?: string | number | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  count: number;
  price: number;
  /** KGS | UZS | TJS — чтобы в корзине показывать валюту товара */
  currency?: string;
}
