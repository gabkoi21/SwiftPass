import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import loginReducer from "./features/auth/loginSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
