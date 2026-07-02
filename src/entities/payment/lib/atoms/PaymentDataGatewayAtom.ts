import { atom } from 'jotai';

import { type IPaymentDataGatewayAtom } from '../types/IPaymentDataGatewayAtom';

export const paymentDataGatewayAtom = atom<IPaymentDataGatewayAtom>({
  id: 0,
  size: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  count: 1,
  price: 0,
});
