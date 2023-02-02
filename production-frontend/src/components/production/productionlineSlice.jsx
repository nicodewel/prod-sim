import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";
import { useDispatch } from "react-redux";
import { addSimulation, removeSimulation } from "./simulationSlice";

const api = new Api();
const initialState = {
    productionlines: [],
    simulatedLines: [],
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
    "ProductionLines/simulate/start",
    async (productionline) => {
        const response = await api.simulations.addToSimulation(productionline);
        return response;
    }
)

export const stopSimulation = createAsyncThunk(
    "ProductionLines/simulate/stop",
    async (productionline) => {
        const response = await api.simulations.stopSimulation(productionline)
        return response;
    }
)

export const getActiveSimulations = createAsyncThunk(
    "simulations/load",
    async () => {
        const response = await api.simulations.getActiveSimulations();
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
                state.simulatedLines = [...state.simulatedLines, action.payload];
                alert(`Die Produktionslinie  wurde erfolgreich gestartet`)

            })
            .addCase(stopSimulation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(stopSimulation.fulfilled, (state, action) => {
                state.status = "idle";
                let index = state.productionlines.findIndex(s => s.id == action.payload.id);
                state.productionlines[index] = action.payload;
                state.simulatedLines = state.simulatedLines.filter(s => s.id != action.payload.id)
                alert(`Die Produktionslinie wurde erfolgreich gestoppt`)
            })
            .addCase(getActiveSimulations.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getActiveSimulations.fulfilled, (state, action) => {
                state.status = "idle";
                state.simulatedLines = action.payload;
            })
    }
})


export default productionlineSlice.reducer; 