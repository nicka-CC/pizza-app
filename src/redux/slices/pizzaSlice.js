import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchByIdStatus",
  async (params,thunkAPI) => {
    const { sortBy, order, searches, categoryIndex, pageCount } = params;
    const { data } = await axios.get(
      `https://65d62ccdf6967ba8e3bda424.mockapi.io/pizzes?page=${pageCount}&limit=4&${
        categoryIndex > 0 ? `category=${categoryIndex}` : ``
      }&sortBy=${sortBy}&order=${order}${searches ? `&search=${searches}` : ``}`

    );
    if(data.length === 0){
      thunkAPI.rejectWithValue("Пицц нет")
    }
    return thunkAPI.fulfillWithValue(data);
    //TODO: thunkAPI


  }
);

const initialState = {
  items: [],
  status: "",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";

        state.items = [];
      })

      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;

        state.status = "success";
      })

      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";

        state.items = [];
      });
  },
});
export const { setItems } = pizzasSlice.actions;
export const selectorCartById = (id) => (state) => state.cart.items.find((obj)=> obj.id === id);
export default pizzasSlice.reducer;