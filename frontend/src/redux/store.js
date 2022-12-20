import { createStore, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import applicationReducer from "./applicationReducer";

const store = configureStore({
    reducer: {
        application: applicationReducer,
    }
})

export default store;
