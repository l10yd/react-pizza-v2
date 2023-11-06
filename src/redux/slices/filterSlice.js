import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryValue: 0,
  sortValue: "rating",
  sortOrder: "asc",
  pageValue: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
    newFilter(state, action) {
      return action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

// Action creators are generated for each case reducer function
export const { updateFilter, newFilter } = filterSlice.actions;

/* Пример использования
dispatch(updateFilter({ sortValue: "date", sortOrder: "desc" })); */

export default filterSlice.reducer;
