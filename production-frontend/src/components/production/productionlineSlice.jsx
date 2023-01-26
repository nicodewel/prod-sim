import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    productionlines: [],
    status: "idle",
};




export const getAllProductionlines = createAsyncThunk(
    "Productionlines/load",
    async () => {
        const response = await api.productionLines.getAll2();
        const json = await response.json()
        return json;
    }
)



const productionlineSlice = createSlice({
    name: "productionlines",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductionlines.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllProductionlines.fulfilled, (state, action) => {
                state.status = 'idle';
                state.productionlines = action.payload;
            })
    }
})


export default productionlineSlice.reducer; 