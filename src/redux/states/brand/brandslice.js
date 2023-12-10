import { createSlice, current } from "@reduxjs/toolkit";
import { makeList } from "./thunk";
const initialState = {
    makeallList: [],
    imageUrl: []
};

const slice = createSlice({
    name: "reported_users",
    initialState: { ...initialState },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(makeList.pending, (state, action) => {
        });
        builder.addCase(makeList.fulfilled, (state, action) => {
            state.makeallList = action.payload;
        });
        builder.addCase(makeList.rejected, (state, action) => {
        });

    },
});

export default slice.reducer;
