import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./thunk";

const initialState = {
  usersList: {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {})
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
