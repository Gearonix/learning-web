import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducer } from 'saga-slice';
import counter from "./reducers/counter";



const saga = createSagaMiddleware()

const modules = [counter]



const store = createStore(rootReducer(modules), applyMiddleware(saga))

window.s = store

saga.run(rootSaga(modules));

export default store;
