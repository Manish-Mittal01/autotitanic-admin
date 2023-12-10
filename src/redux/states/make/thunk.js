import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const makeList = createAsyncThunk(
  "makeAndModal/makeList",
  async (payload, Thunk) => {
    try {
      const queryParams = [];
      console.log("///payload", payload);
      if (payload?.limit) {
        queryParams.push(`limit=${payload.limit}`);
      }

      if (payload?.page) {
        queryParams.push(`page=${payload.page}`);
      }

      if (payload?.start_date) {
        queryParams.push(`start_date=${payload.sort}`);
      }

      if (payload?.end_date) {
        queryParams.push(`end_date=${payload.filter_status}`);
      }

      if (payload?.timezoneOffsetStr) {
        queryParams.push(`timezoneOffsetStr=${payload.timezoneOffsetStr}`);
      }

      // Combine all query parameters into a single string
      const query = queryParams.join("&");

      // Construct the full URL with query parameters
      const url = `/api/v1/allMake${query ? `?${query}` : ""}`;
      let response = (await axios.get(url))?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);

export const addBrand = createAsyncThunk(
  "makeAndModal/addBrand",
  async (payload, Thunk) => {
    try {
      let request = {
        label: payload?.label,
        value: payload?.value,
        logo: payload?.logo,
        type: payload?.vehicleType
      };

      let response = (await axios.post("/api/v1/addMake", request))
        ?.data;
      console.log("Call Finished", response);
      dispatc
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const imageUploadUrl = createAsyncThunk(
  "uploadImage/imageUploadUrl",
  async (payload, Thunk) => {
    try {
      const formData = new FormData();
      formData.append("images", payload);
      // formData.append("folder", "users");

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
        await axiosInstanceWithHeaders.post("/api/v1/uploadFiles", formData)
      )?.data;

      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const editBrand = createAsyncThunk(
  "makeAndModal/editBrand",
  async (payload, Thunk) => {
    try {
      let request = {
        label: payload?.label,
        value: payload?.value,
        logo: payload?.logo,
        type: payload?.vehicleType,
        makeId: payload?.makeId
      };

      let response = (await axios.post("/api/v1/updateMake", request))
        ?.data;
      console.log("Call Finished", response);
      ThunkAPI.dispatch(makeList());
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const deleteMake = createAsyncThunk("makeAndModal/deleteMake", async (payload, Thunk) => {
  try {
    let queryParams = ""
    if (payload) {
      queryParams = "/" + payload
    }
    const makeid = {
      makeId: payload
    }
    console.log('queryParams', queryParams)
    let response = (await axios.post("/api/v1/deletemake", makeid))?.data;
    console.log("Call Finished", response);
    return response
  } catch (error) {
    console.log('error====>', error)
    return Thunk.rejectWithValue(error);
  }
});
