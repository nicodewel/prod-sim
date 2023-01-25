import { combineReducers } from "@reduxjs/toolkit";
import robotSlice from "../components/production/robotSlice";


const rootReducer = combineReducers({
    robots: robotSlice
    
});

export default rootReducer;
