import { take , takeEvery, put , call , select, takeLatest} from 'redux-saga/effects';
import { INCREASE_COUNT, DECREASE_COUNT } from '../constants';
import {decreaseCount, increaseCount} from "../actions/actionCreator";
import axios from 'axios'


const delay = () => new Promise((resolve, reject) => setTimeout(resolve, 2000))

const request = () => axios.get('http://localhost:6868')

export function* incrementWorker() {
    const data = yield call(request)
    const qwe = yield call(request)
    console.log(data)
    console.log(qwe)
    yield put(decreaseCount(data))
}

export function* watchClickSaga() {
  yield takeEvery(INCREASE_COUNT, incrementWorker);
}

export default function* rootSaga() {
  yield watchClickSaga();
}
