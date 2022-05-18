import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers 
import posting from "./reducers/posts"
import auth from "./reducers/auth"
import komunitas from "./reducers/komunitas";
import user from "./reducers/user"

// root reducer 
const rootreducer = combineReducers({
    posting,
    auth,
    komunitas,
    user
});

// store - main storage 
const store = configureStore({
    reducer: rootreducer
})

export default store