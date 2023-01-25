import { combineReducers } from "@reduxjs/toolkit";
import robotSlice from "../components/production/ressourceSlice";


const rootReducer = combineReducers({
    robots: robotSlice
    
});

export default rootReducer;
