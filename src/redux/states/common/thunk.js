import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const imageUpload = createAsyncThunk(
  "common/imageUpload",
  async (payload, Thunk) => {
    try {
      const formData = new FormData();
      formData.append("images", payload.file);

      let newHeaders = {
        "Content-Type": "multipart/form-data",
      };

      const axiosInstanceWithHeaders = axios.create({
        headers: {
          ...axios.defaults.headers, // Merge default headers
          ...newHeaders, // Merge custom headers
        },
      });

      let response = (
        await axiosInstanceWithHeaders.post("uploadFiles", formData)
      )?.data;

      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
