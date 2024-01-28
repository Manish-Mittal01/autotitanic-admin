import { createSlice } from "@reduxjs/toolkit";
import { getVehicleDetails, getVehicleList } from "./thunk";

const initialState = {
  vehicleList: {},
  vehicleDetails: {},
};

const vehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleList.pending, (state, action) => {})
      .addCase(getVehicleList.fulfilled, (state, action) => {
        state.vehicleList = action.payload;
      })
      .addCase(getVehicleList.rejected, (state, action) => {});
    builder
      .addCase(getVehicleDetails.pending, (state, action) => {})
      .addCase(getVehicleDetails.fulfilled, (state, action) => {
        state.vehicleDetails = action.payload;
      })
      .addCase(getVehicleDetails.rejected, (state, action) => {});
  },
});

export default vehicleSlice.reducer;
