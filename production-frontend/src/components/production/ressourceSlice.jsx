import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    robots: [],
    status: "idle",
};

export const getAllRobots = createAsyncThunk(
    "robots/load",
    async () => {
        const response = await api.robots.getAll();
        const json = await response.json()
        return json;
    }
)

export const createNewRobot = createAsyncThunk(
    "robots/build",
    async (robot) => {
        const response = await api.robots.save(robot);
        return response;
    }
)



const robotSlice = createSlice({
    name: "robots",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllRobots.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllRobots.fulfilled, (state, action) => {
                state.status = 'idle';
                state.robots = action.payload;
            })
            .addCase(createNewRobot.fulfilled, (state, action) => {
                state.status = 'idle';
                state.robots = [...state.robots, action.payload]
            });
    },
})



export default robotSlice.reducer; 