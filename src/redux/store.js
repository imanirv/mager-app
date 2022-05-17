import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers 
import posting from "./reducers/posts"
import auth from "./reducers/auth"
import komunitas from "./reducers/komunitas";

// root reducer 
const rootreducer = combineReducers({
    posting,
    auth,
    komunitas
});

// store - main storage 
const store = configureStore({
    reducer: rootreducer
})

export default store