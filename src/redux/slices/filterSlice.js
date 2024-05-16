import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
export const selectorSort = (state)=> state.filter.sort;
export const { setCategoryId, setSort, setPageCount, setFilters,setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
