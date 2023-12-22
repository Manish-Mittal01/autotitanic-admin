import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCity,
  getAllCountry,
  getCityDetails,
  getCountryDetails,
} from "./thunk";

const initialState = {
  allCountryList: {},
  countryDetails: {},
  allCityList: {},
  cityDetails: {},
};

const countrySlice = createSlice({
  name: "countrySlice",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountry.pending, (state, action) => {})
      .addCase(getAllCountry.fulfilled, (state, action) => {
        state.allCountryList = action.payload;
      })
      .addCase(getAllCountry.rejected, (state, action) => {});
    builder
      .addCase(getAllCity.pending, (state, action) => {})
      .addCase(getAllCity.fulfilled, (state, action) => {
        state.allCityList = action.payload;
      })
      .addCase(getAllCity.rejected, (state, action) => {});
    builder
      .addCase(getCountryDetails.pending, (state, action) => {})
      .addCase(getCountryDetails.fulfilled, (state, action) => {
        state.countryDetails = action.payload;
      })
      .addCase(getCountryDetails.rejected, (state, action) => {});
    builder
      .addCase(getCityDetails.pending, (state, action) => {})
      .addCase(getCityDetails.fulfilled, (state, action) => {
        state.cityDetails = action.payload;
      })
      .addCase(getCityDetails.rejected, (state, action) => {});
  },
});

export default countrySlice.reducer;
