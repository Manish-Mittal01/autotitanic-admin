import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (filters, Thunk) => {
  try {
    const response = await axios.post(`allUsers`, filters);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const userStatus = createAsyncThunk("users/userStatus", async (userId, Thunk) => {
  try {
    const response = await axios.post(`userStatus`, userId);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
