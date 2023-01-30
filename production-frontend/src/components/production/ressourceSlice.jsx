import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    robots: [],
    stations: [],
    employees: [],
    status: "idle",
};

export const getAllComponents = createAsyncThunk(
    "components/load",
    async () => {
        const response = await api.productionLineComponents.getAll3();
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
            if (action.payload.hasOwnProperty("employees")) {
                console.log("ICH BIN EINE STATION");
                let indexStation = state.stations.findIndex(s => s.id == action.payload.id);
                state.stations[indexStation].onDuty = true;                

            } else {
                console.log("ICH BIN EIN ROBOTER");
                let index = state.robots.findIndex(r => r.id == action.payload.id);
                state.robots[index].onDuty = true;
            } 
        },
        setEmployeeBusy: (state,action) => {
            let index = state.employees.findIndex(r => r.id == action.payload.id);
                state.employees[index].onDuty = true;
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllComponents.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getAllComponents.fulfilled, (state, action) => {
                state.robots = action.payload.filter(comp => comp.type == "robot")
                state.stations = action.payload.filter(comp => comp.type == "station")
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

export const { setCompBusy, setEmployeeBusy } = ressourceSlice.actions;



export default ressourceSlice.reducer; 