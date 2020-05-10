import {createStore} from 'redux';
import {initialState, Reducer} from './reducer.js';

export const ConfigureStore=()=>{
    const store=createStore(
        Reducer,initialState
    );
    return store;
}
