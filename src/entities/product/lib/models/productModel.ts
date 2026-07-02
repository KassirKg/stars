export interface IProduct {
  id: number;
  title: string;
  price: number;
  author: string;
  image: string;
  slug: string;
  new?: boolean;
}

export interface IProductModel {
  id: number;
  title: string;
  price: number;
  image: string;
  count: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  size: string;
}
