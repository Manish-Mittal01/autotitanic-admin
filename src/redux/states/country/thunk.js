import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCountry = createAsyncThunk(
  "countryAndCity/getAllCountry",
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

      const response = await axios.get(
        `allCountry/${query ? `?${query}` : ""}`
      );
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const createCountry = createAsyncThunk(
  "countryAndCity/createCountry",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`addCountry`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getCountryDetails = createAsyncThunk(
  "countryAndCity/getCountryDetails",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`viewCountry/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateCountryDetails = createAsyncThunk(
  "countryAndCity/updateCountryDetails",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`updateCountry`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const deleteCountry = createAsyncThunk(
  "countryAndCity/deleteCountry",
  async (id, Thunk) => {
    try {
      const response = await axios.delete(`deleteCountry/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getAllCity = createAsyncThunk(
  "countryAndCity/getAllCity",
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

      const response = await axios.get(`allCity/${query ? `?${query}` : ""}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const createCity = createAsyncThunk(
  "makeAndModel/createCity",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`addCity`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getCityDetails = createAsyncThunk(
  "makeAndModel/getCityDetails",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`viewCity/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateCityDetails = createAsyncThunk(
  "makeAndModel/updateCityDetails",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`updateCity`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const deleteCity = createAsyncThunk(
  "makeAndModel/deleteCity",
  async (id, Thunk) => {
    try {
      const response = await axios.delete(`deleteCity/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
