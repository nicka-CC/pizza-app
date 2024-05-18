import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts"

type Sorts = {
  name: string,
  sortProperty: string,
}

interface fillterSliceInterface {
  categoryId: number,
  searchValue: string,
  pageCount: number,
  sort: Sorts,
}

const initialState: fillterSliceInterface = {
  categoryId: 0,
  searchValue: '',
  pageCount: 1,
  sort: {
    name: "популярности",
    sortProperty: "raiting",
  },
};

const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.pageCount = Number(action.payload.pageCount);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});
export const selectorSort = (state: RootState) => state.filter.sort;
export const {setCategoryId, setSort, setPageCount, setFilters, setSearchValue} =
  filterSlice.actions;
export default filterSlice.reducer;
