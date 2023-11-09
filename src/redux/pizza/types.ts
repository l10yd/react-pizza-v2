import { CartItem } from "../cart/types";

//для initial state
export interface PizzaSliceState {
  items: CartItem[];
  status: "loading" | "success" | "error";
}
