import { createSlice } from "@reduxjs/toolkit";
import {
  getAllMake,
  getAllModel,
  getMakeDetails,
  getModelDetails,
} from "./thunk";

const initialState = {
  allMakeList: {},
  makeDetails: {},
  modelDetails: {},
  allModelList: {},
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
    builder
      .addCase(getAllModel.pending, (state, action) => {})
      .addCase(getAllModel.fulfilled, (state, action) => {
        state.allModelList = action.payload;
      })
      .addCase(getAllModel.rejected, (state, action) => {});
    builder
      .addCase(getModelDetails.pending, (state, action) => {})
      .addCase(getModelDetails.fulfilled, (state, action) => {
        state.modelDetails = action.payload;
      })
      .addCase(getModelDetails.rejected, (state, action) => {});
  },
});

export default makeSlice.reducer;
