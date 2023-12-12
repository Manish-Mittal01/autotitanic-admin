import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const modalList = createAsyncThunk(
    "brandModal/modalList",
    async (payload, Thunk) => {
        try {
            const queryParams = [];
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

            const query = queryParams.join("&");

            const url = `/api/v1/allModel${query ? `?${query}` : ""}`;
            let response = (await axios.get(url))?.data;
            console.log("Call Finished", response);
            return response;
        } catch (error) {
            console.log("error====>", error);
            return Thunk.rejectWithValue(error);
        }
    }
);
export const addModal = createAsyncThunk(
    "brandModal/addModal",
    async (payload, Thunk) => {
        try {
            let response = (await axios.post("/api/v1/addModel", payload))
                ?.data;
            console.log("Call Finished", response);
            return response;
        } catch (error) {
            console.log("error====>", error);
            return Thunk.rejectWithValue(error);
        }
    }
);