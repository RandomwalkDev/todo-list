import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todoSlice.js"
import ThemeReducer from "./themeSlice.js"


const rootReducer = combineReducers({
    todo: TodoReducer,
    theme: ThemeReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store