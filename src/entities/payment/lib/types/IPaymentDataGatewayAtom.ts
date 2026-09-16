export interface IPaymentDataGatewayAtom {
  id: string | number;
  size?: string;
  colorId?: string | number | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  count: number;
  price: number;
  currency?: string;
}
