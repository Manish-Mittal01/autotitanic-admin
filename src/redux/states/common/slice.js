import { createSlice } from "@reduxjs/toolkit";
import { imageUpload } from "./thunk";

const initialState = {
  status: false,
  showLoader: false,
  availableRoles: {},
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(imageUpload.pending, (state, action) => {
        console.log("Vello1", state);
      })
      .addCase(imageUpload.fulfilled, (state, action) => {})
      .addCase(imageUpload.rejected, (state, action) => {
        console.log("Vello3", state);
      });
  },
});

export default commonSlice.reducer;
