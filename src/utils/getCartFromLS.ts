import { calcTotalPrice } from "./calcTotalPrice";
import { CartItem } from "../redux/cart/types";

//загружает корзину из localStorage, если она есть, считает суммарную цену
//и возвращает корзину и цену
export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  return { items: items as CartItem[], totalPrice };
};
