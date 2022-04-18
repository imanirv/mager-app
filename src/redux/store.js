import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers 
import home from "./reducers/home"

// root reducer 
const rootreducer = combineReducers({
    home
});

// store - main storage 
const store = configureStore({
    reducer: rootreducer
})

export default store