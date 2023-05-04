import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import API from "../service/service";


const rootReducer = combineReducers({
  todos: todoReducer,
  [API.reducerPath] : API.reducer
})


export default configureStore({
  reducer: rootReducer,
  middleware(getMiddleWare){
    return getMiddleWare().concat(API.middleware)
  }
});
