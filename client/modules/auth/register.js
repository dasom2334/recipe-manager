import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';

import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"
//https://stackoverflow.com/questions/55869455/create-action-with-payload
export const initialState = {
    isRegistered: false
}

const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
export const registerRequest = createAction(REGISTER_REQUEST, data => data)
export function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, signup);
}
function* signup(action) {
    try {
        const response = yield call(registerAPI, action.payload)
        yield put({type: REGISTER_SUCCESS, payload: response.data})
        yield put((window.location.href = "/auth/login"));
    } catch (error) {
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}
const registerAPI = payload => axios.post(
    `${SERVER}/user/join`,
    {  
        ...payload,
        headers
    }
)
const register = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [REGISTER_SUCCESS]: (state, _action) => ({
        ...state,
        isRegistered: true
    }),
    [REGISTER_FAILURE]: (state, _action) => ({
        ...state,
        isRegistered: false
    })
}, initialState)
export default register