//тип для item - ну да, такой объект получаем
export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

//интерфейс типизирует только объект (можно и в тип его)
//обычно стейт типизируют интерфейсом, когда есть много вложенных типов
export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
