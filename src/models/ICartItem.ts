import { IProduct } from "./IProduct";

export interface ICartItem extends IProduct {
  cartItemId: string;
  quantity?: number;
  total?: number;
}
