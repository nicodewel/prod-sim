import { combineReducers } from "@reduxjs/toolkit";
import ressourceSlice from "../components/production/ressourceSlice";
import productionlineSlice from "../components/production/productionlineSlice";
import simulationSlice from "../components/production/simulationSlice";


const rootReducer = combineReducers({
    ressources: ressourceSlice,
    productionlines: productionlineSlice,
});

export default rootReducer;
