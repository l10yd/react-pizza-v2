import { CartItem } from "../redux/cart/types";

//считает суммарную стоимость корзины
export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
