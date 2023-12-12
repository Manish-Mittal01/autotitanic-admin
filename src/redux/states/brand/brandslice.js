import { createSlice, current } from "@reduxjs/toolkit";
import { addModal, modalList } from "./brandThunk";
const initialState = {
    makeallList: [],
};

const slice = createSlice({
    name: "reported_users",
    initialState: { ...initialState },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(modalList.pending, (state, action) => {
        });
        builder.addCase(modalList.fulfilled, (state, action) => {
            state.makeallList = action.payload;
        });
        builder.addCase(modalList.rejected, (state, action) => {
        });
        builder.addCase(addModal.pending, (state, action) => {
        });
        builder.addCase(addModal.fulfilled, (state, action) => {
            state.makeallList = action.payload;
        });
        builder.addCase(addModal.rejected, (state, action) => {
        });

    },
});

export default slice.reducer;
