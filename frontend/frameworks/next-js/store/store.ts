import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import reducer from "./reducer";

const makeStore = () => configureStore({
    reducer: {
        tests: reducer
    },
    devTools: true
})
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

const wrapper =  createWrapper<any>(makeStore)



export default wrapper
