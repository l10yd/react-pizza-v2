import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectCategory = (state: RootState) => state.filter.categoryValue;
