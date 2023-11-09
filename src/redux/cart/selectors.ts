import { RootState } from "../store";
import { CartItem } from "./types";

//кастомные селекторы, чтобы не писать одно и то же в разных компонентах
export const selectCart = (state: RootState) => state.cart;
//единственный полезный селектор
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);
