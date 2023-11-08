import { configureStore } from "@reduxjs/toolkit";
//берется дефолтный экспорт, назови как хочешь
import filter from "./slices/filterSlice";
import search from "./slices/searchSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, search, cart, pizza },
});

/*чтобы не перечислять все типы слайсов, 
заказываем у редакса весь стейт, получаем его тип (как функцию), 
returnType ковертирует эту функцию в тип*/
export type RootState = ReturnType<typeof store.getState>;

//делаем типизированный кастомный диспатч для этого стора
//чтобы диспатчить только то, что есть в сторе, а не что попало
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
