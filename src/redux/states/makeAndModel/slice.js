import { createSlice, current } from "@reduxjs/toolkit";
import { getAllMake, getMakeDetails } from "./thunk";
const initialState = {
  allMakeList: {},
  makeDetails: {},
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
    builder
      .addCase(getMakeDetails.pending, (state, action) => {})
      .addCase(getMakeDetails.fulfilled, (state, action) => {
        state.makeDetails = action.payload;
      })
      .addCase(getMakeDetails.rejected, (state, action) => {});
  },
});

export default makeSlice.reducer;
