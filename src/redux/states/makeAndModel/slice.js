import { createSlice, current } from "@reduxjs/toolkit";
import { getAllMake } from "./thunk";
const initialState = {
  allMakeList: {},
  imageUrl: [],
};

const makeSlice = createSlice({
  name: "makeSlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMake.pending, (state, action) => {})
      .addCase(getAllMake.fulfilled, (state, action) => {
        state.allMakeList = action.payload;
      })
      .addCase(getAllMake.rejected, (state, action) => {});
  },
});

export default makeSlice.reducer;
