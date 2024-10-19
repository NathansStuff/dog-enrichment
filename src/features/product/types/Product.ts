import { EProductType } from './EProductType';

export interface Product {
  name: string;
  description: string;
  priceId: string;
  amount: string;
  productId: string;
  type: EProductType;
  tokens?: number;
}
