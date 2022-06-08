import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers 
import posting from "./reducers/posts"
import auth from "./reducers/auth"
import komunitas from "./reducers/komunitas";
import user from "./reducers/user"
import games from "./reducers/games";
import notification from "./reducers/notification";
import unauth from "./reducers/unauthorized";

// root reducer 
const rootreducer = combineReducers({
    posting,
    auth,
    komunitas,
    user,
    games,
    notification,
    unauth
});

// store - main storage 
const store = configureStore({
    reducer: rootreducer
})

export default store