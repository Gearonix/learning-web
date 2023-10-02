import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    test : 'test1',
    data : {}
}


const reducer = createSlice({
    name : 'reducer',
    initialState,
    reducers: {
        setName(state,action){
            console.log(action)
            state.test = action.payload
        },
        setData(state,action){
            state.data = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATION')
            console.log(action)
            return {
                ...state,
                ...action.payload.tests,
            };
        },
    },
})
export const {setName,setData} = reducer.actions


export const someThunk = createAsyncThunk('SOME_THUNK',
    async (data,{dispatch}) => {
        const response = await fetch('http://localhost:6868')
        const json = await response.json()
        dispatch(setData(json))
    })


export default reducer.reducer
