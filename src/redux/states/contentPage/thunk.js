import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContentPageList = createAsyncThunk(
  "contentPage/getPageList",
  async (filters, Thunk) => {
    try {
      const response = await axios.get(`getContentPageList`, filters);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
export const getContentPage = createAsyncThunk(
  "contentPage/getPage",
  async (pageId, Thunk) => {
    try {
      const response = await axios.get(`getContentPage/${pageId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const createContentPage = createAsyncThunk(
  "contentPage/create",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`addContentPage`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateContentPage = createAsyncThunk(
  "makeAndModel/getDetails",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`updateContentPage`, details);
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
