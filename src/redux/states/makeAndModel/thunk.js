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
      // if (filters?.order) {
      //   queryParams.push(`order=${filters.order}`);
      // }
      // if (filters?.orderBy) {
      //   queryParams.push(`orderBy=${filters.orderBy}`);
      // }
      // if (filters?.serverPaging) {
      //   queryParams.push(`serverPaging=${filters.serverPaging}`);
      // }
      // if (filters?.search) {
      //   queryParams.push(`search=${filters.search}`);
      // }
      const query = queryParams.join("&");

      const response = await axios.get(`allMake/${query ? `?${query}` : ""}`);
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
      const response = await axios.post(`bots`, details);
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
      const response = await axios.get(`bots/${id}`);
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
      const response = await axios.put(`bots/${details.id}`, details);
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
      const response = await axios.delete(`bots/${id}`);
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
      const response = await axios.put(`updateModel/${details.id}`, details);
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
      const response = await axios.delete(`deletemodel/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
