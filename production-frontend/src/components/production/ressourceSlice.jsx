import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../backendApi";

const api = new Api();
const initialState = {
    robots: [],
    stations: [],
    employees: [],
    carModels: [],
    status: "idle",
};

export const getAllComponents = createAsyncThunk(
    "components/load",
    async () => {
        const response = await api.productionLineComponents.getAll1();
        const json = await response.json()
        return json;
    }
)

export const createNewRobot = createAsyncThunk(
    "robots/build",
    async (robot) => {
        const response = await api.productionLineComponents.save1(robot);
        const json = await response.json()
        return response;
    }
)

export const getAllCarModels = createAsyncThunk(
    "carModels/load",
    async () => {
        const response = await api.carModels.getAll3();
        const json = await response.json();
        return json;
    }
)


export const createNewStation = createAsyncThunk(
    "stations/build",
    async (station) => {
        const response = await api.productionLineComponents.save1(station);
        return response;
    }
)

export const getAllEmployees = createAsyncThunk(
    "employees/load",
    async () => {
        const response = await api.employees.getAll2();
        const json = await response.json()
        return json;
    }
)

export const createNewEmployee = createAsyncThunk(
    "employees/build",
    async (employee) => {
        const response = await api.employees.save2(employee);
        return response;
    }
)





const ressourceSlice = createSlice({
    name: "robots",
    initialState,
    reducers: {
        setCompBusy: (state, action) => {

            if (action.payload.type == "station") {
                console.log("ICH BIN EINE STATION");
                let indexStation = state.stations.findIndex(s => s.id == action.payload.id);
                state.stations[indexStation].onDuty = true;

            } else {
                console.log("ICH BIN EIN ROBOTER");
                let index = state.robots.findIndex(r => r.id == action.payload.id);
                state.robots[index].onDuty = true;
            }
        },
        setEmployeeBusy: (state, action) => {
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
            .addCase(getAllEmployees.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.status = 'idle';
                state.employees = action.payload;
            })
            .addCase(getAllCarModels.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getAllCarModels.fulfilled, (state, action) => {
                state.carModels = action.payload;
            })
            .addCase(createNewEmployee.fulfilled, (state, action) => {
                state.status = 'idle';
                state.employees = [...state.employees, action.payload]
                alert(`Der Mitarbeiter "${action.payload.name}" wurde erfolgreich angelegt`)
            })
            .addCase(createNewRobot.fulfilled, (state, action) => {
                state.status = 'idle';
                state.robots = [...state.robots, action.payload]
                alert(`Der Roboter "${action.payload.name}" wurde erfolgreich angelegt`)
            })
            .addCase(createNewStation.fulfilled, (state, action) => {
                state.status = 'idle';
                state.stations = [...state.stations, action.payload]
                alert(`Die Station "${action.payload.name}" wurde erfolgreich angelegt`)
            });
    },
})

export const { setCompBusy, setEmployeeBusy } = ressourceSlice.actions;



export default ressourceSlice.reducer; 