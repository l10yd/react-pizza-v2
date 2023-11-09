import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { FilterSliceState } from "./types";

const initialState: FilterSliceState = {
  categoryValue: 0,
  sortValue: "rating",
  sortOrder: "asc",
  pageValue: 1,
};

//вот как сочно надо типизировать и апдейтить объекты!!
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    //передаем опциональные ключи типа FilterSliceState (т.е. не все могут быть)
    updateFilter(state, action: PayloadAction<Partial<FilterSliceState>>) {
      return { ...state, ...action.payload };
    },
    //а тут заменяется целиком объект, поэтому без Partial
    newFilter(state, action: PayloadAction<FilterSliceState>) {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilter, newFilter } = filterSlice.actions;

/* Пример использования
dispatch(updateFilter({ sortValue: "date", sortOrder: "desc" })); */

export default filterSlice.reducer;
