import { combineReducers } from "@reduxjs/toolkit";
import ressourceSlice from "../components/production/ressourceSlice"; 


const rootReducer = combineReducers({
    ressources: ressourceSlice
    
});

export default rootReducer;
