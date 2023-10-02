import { INCREASE_COUNT, DECREASE_COUNT } from "../constants";
import {createModule} from "saga-slice";
import {call, put} from "redux-saga/effects";
import {decreaseCount} from "../actions/actionCreator";
import axios from "axios";

const request = () => new Promise((resolve,reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET','http://localhost:6868')
  xhr.onload = resolve
  xhr.onerror = reject
  xhr.send()
})

const counterSlice = createModule({
  name: 'counter',
  initialState: {count: 0},
  reducers: {
    increaseCount(state){
    },
    increaseCountSuccess(state){
      state.count += 1
    }
  },
  sagas: (type) => ({
    *[type.increaseCount]({payload}){
      const data = yield call(request) // axios.get('http ...
      // const json = yield call(() => data.json())
      console.log(JSON.parse(data.target.response))
      yield put(type.increaseCountSuccess(data))
    }
  })

})

export const {increaseCount} = counterSlice.actions

window.iq = increaseCount


export default counterSlice;
