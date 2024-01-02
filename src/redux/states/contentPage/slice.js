import { createSlice } from "@reduxjs/toolkit";
import { getContentPage, getContentPageList } from "./thunk";

const initialState = {
  contentPagesList: {},
  contentPage: {},
};

const contentPageSlice = createSlice({
  name: "contentPageSlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContentPageList.pending, (state, action) => {})
      .addCase(getContentPageList.fulfilled, (state, action) => {
        state.contentPagesList = action.payload;
      })
      .addCase(getContentPageList.rejected, (state, action) => {});
    builder
      .addCase(getContentPage.pending, (state, action) => {})
      .addCase(getContentPage.fulfilled, (state, action) => {
        state.contentPage = action.payload;
      })
      .addCase(getContentPage.rejected, (state, action) => {});
  },
});

export default contentPageSlice.reducer;
