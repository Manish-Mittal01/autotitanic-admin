import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVehicleList = createAsyncThunk(
  "vehicles/getVehicleList",
  async (filters, Thunk) => {
    try {
      const response = await axios.post(`AllVehicles`, filters);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getVehicleDetails = createAsyncThunk(
  "vehicles/getVehicleDetails",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`vehicleDetails/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateVehicle = createAsyncThunk("vehicles/updateVehicle", async (request, Thunk) => {
  try {
    const response = await axios.post(`updateVehicle/${request.id}`, request);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
