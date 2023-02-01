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
        const response = await api.productionLines.getAll();
        const json = await response.json()
        console.log("PRODLINES: ", json)
        return json;
    }
)

export const buildNewProductionline = createAsyncThunk(
    "ProductionLines/create",
    async (productionline) => {
        console.log("TOPOST:", productionline)
        const response = await api.productionLines.save(productionline);
        const json = await response.json()
        return response.json();
    }
)

export const simulateProductionline = createAsyncThunk(
    "ProductionLines/simulate",
    async (productionline) => {
        console.log("PRODUCTIONLINE IN ACTION: ", productionline)
        const response = await api.simulations.addToSimulation(productionline);
        return response;
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
            .addCase(buildNewProductionline.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(buildNewProductionline.fulfilled, (state, action) => {
                state.status = "idle";
                state.productionlines = [...state.productionlines, action.payload]
                alert(`Die Produktionslinie  wurde erfolgreich angelegt`)
            })
            .addCase(simulateProductionline.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(simulateProductionline.fulfilled, (state, action) => {
                state.status = "idle";
                let index = state.productionlines.findIndex(s => s.id == action.payload.id);
                state.productionlines[index] = action.payload;
                alert(`Die Produktionslinie  wurde erfolgreich gestartet`)
            })
    }
})


export default productionlineSlice.reducer; 