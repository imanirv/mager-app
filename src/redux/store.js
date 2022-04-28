import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers 
import posting from "./reducers/posts"
import auth from "./reducers/auth"

// root reducer 
const rootreducer = combineReducers({
    posting,
    auth
});

// store - main storage 
const store = configureStore({
    reducer: rootreducer
})

export default store