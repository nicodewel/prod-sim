import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    robots: [],
    stations: [],
    employees: [],
    status: "idle",
};

export const getAllRobots = createAsyncThunk(
    "robots/load",
    async () => {
        const response = await api.robots.getAll1();
        const json = await response.json()
        return json;
    }
)

export const createNewRobot = createAsyncThunk(
    "robots/build",
    async (robot) => {
        const response = await api.robots.save1(robot);
        return response;
    }
)

export const getAllStations = createAsyncThunk(
    "stations/load",
    async () => {
        const response = await api.stations.getAll();
        const json = await response.json()
        return json;
    }
)

export const createNewStation = createAsyncThunk(
    "stations/build",
    async (station) => {
        const response = await api.stations.save(station);
        return response;
    }
)

export const getAllEmployees = createAsyncThunk(
    "employees/load",
    async () => {
        const response = await api.employees.getAll3();
        const json = await response.json()
        return json;
    }
)

export const createNewEmployee = createAsyncThunk(
    "employees/build",
    async (employee) => {
        const response = await api.employees.save3(employee);
        return response;
    }
)





const ressourceSlice = createSlice({
    name: "robots",
    initialState,
    reducers: {
        setCompBusy: (state, action) => {
            console.log("ACTION :", action.payload.hasOwnProperty("employees"))
            //find out if action ist robot/station or employee
            if (action.payload.hasOwnProperty("employees") && action.payload.hasOwnProperty("productionTime")) {
                console.log("ICH BIN EINE STATION");
                let indexStation = state.stations.findIndex(s => s.id == action.payload.id);
                state.stations[indexStation].onDuty = true;                

            } else if (action.payload.hasOwnProperty("productionTime")) {
                console.log("ICH BIN EIN ROBOTER");
                let index = state.robots.findIndex(r => r.id == action.payload.id);
                state.robots[index].onDuty = true;
            } 
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllRobots.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAllRobots.fulfilled, (state, action) => {
                state.status = 'idle';
                state.robots = action.payload;
            })
            .addCase(getAllStations.fulfilled, (state, action) => {
                state.status = 'idle';
                state.stations = action.payload;
            })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.status = 'idle';
                state.employees = action.payload;
            })
            .addCase(createNewEmployee.fulfilled, (state, action) => {
                state.status = 'idle';
                state.employees = [...state.employees, action.payload]
            })
            .addCase(createNewRobot.fulfilled, (state, action) => {
                state.status = 'idle';
                state.robots = [...state.robots, action.payload]
            })
            .addCase(createNewStation.fulfilled, (state, action) => {
                state.status = 'idle';
                state.stations = [...state.stations, action.payload]
            });
    },
})

export const { setCompBusy } = ressourceSlice.actions;



export default ressourceSlice.reducer; 