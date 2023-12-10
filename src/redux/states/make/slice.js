import { createSlice, current } from "@reduxjs/toolkit";
import { makeList, imageUploadUrl, addBrand, editBrand, deleteMake } from "./thunk";
const initialState = {
  makeallList: [],
  imageUrl: []
};

const slice = createSlice({
  name: "reported_users",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeList.pending, (state, action) => {
    });
    builder.addCase(makeList.fulfilled, (state, action) => {
      state.makeallList = action.payload;
    });
    builder.addCase(makeList.rejected, (state, action) => {
    });
    builder.addCase(imageUploadUrl.pending, (state, action) => {
    });
    builder.addCase(imageUploadUrl.fulfilled, (state, action) => {
      state.imageUrl = action.payload;
    });
    builder.addCase(imageUploadUrl.rejected, (state, action) => {
    });
    builder.addCase(addBrand.pending, (state, action) => {
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
      // state.imageUrl = action.payload;
    });
    builder.addCase(addBrand.rejected, (state, action) => {
    });
    builder.addCase(editBrand.pending, (state, action) => {
    });
    builder.addCase(editBrand.fulfilled, (state, action) => {
      // state.imageUrl = action.payload;
    });
    builder.addCase(editBrand.rejected, (state, action) => {
    });
    builder.addCase(deleteMake.pending, (state, action) => {
    });
    builder.addCase(deleteMake.fulfilled, (state, action) => {
      // state.imageUrl = action.payload;
    });
    builder.addCase(deleteMake.rejected, (state, action) => {
    });
  },
});

export default slice.reducer;
