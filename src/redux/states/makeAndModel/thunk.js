import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMake = createAsyncThunk(
  "makeAndModel/getAll",
  async (filters, Thunk) => {
    try {
      const queryParams = [];

      if (filters?.page) {
        queryParams.push(`page=${filters.page}`);
      }
      if (filters?.limit) {
        queryParams.push(`limit=${filters.limit}`);
      }

      const query = queryParams.join("&");
      const response = await axios.get(`makeList/${query ? `?${query}` : ""}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const createMake = createAsyncThunk(
  "makeAndModel/create",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`addMake`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getMakeDetails = createAsyncThunk(
  "makeAndModel/getDetails",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`makeDetails/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateMakeDetails = createAsyncThunk(
  "makeAndModel/update",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`updateMake`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const deleteMake = createAsyncThunk(
  "makeAndModel/delete",
  async (id, Thunk) => {
    try {
      const response = await axios.post(`deletemake`, id);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getAllModel = createAsyncThunk(
  "makeAndModel/getAllModel",
  async (filters, Thunk) => {
    try {
      const queryParams = [];

      if (filters?.page) {
        queryParams.push(`page=${filters.page}`);
      }
      if (filters?.limit) {
        queryParams.push(`limit=${filters.limit}`);
      }

      const query = queryParams.join("&");
      const response = await axios.get(`modelList/${query ? `?${query}` : ""}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const createModel = createAsyncThunk(
  "makeAndModel/createModel",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`addModel`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getModelDetails = createAsyncThunk(
  "makeAndModel/getDetailsModel",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`modelDetails/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateModelDetails = createAsyncThunk(
  "makeAndModel/updateModel",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`updateModel`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const deleteModel = createAsyncThunk(
  "makeAndModel/deleteModel",
  async (id, Thunk) => {
    try {
      const response = await axios.post(`deletemodel`, id);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
