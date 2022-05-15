import {createAction, handleActions} from 'redux-actions';
import {
    call,
    delay,
    put,
    takeLatest,
    select,
    throttle
} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'
import { createBrowserHistory } from 'history'

import {SERVER, headers} from "@/modules/auth/server"
export const initialState = {
    isModalOpen: false,
}
const MODAL_OPEN = 'ui/MODAL_OPEN';

export const modalRequest = createAction(MODAL_OPEN, data => data)

export function* modalSaga() {
    yield takeLatest(MODAL_OPEN, turnModal);
}
function* turnModal(action) {
    console.log(action);
    yield put({type: MODAL_OPEN, payload: action});
}
const modal = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [MODAL_OPEN]: (state, action) => ({
        ...state,
        isModalOpen: action.payload.isModalOpen,
    }),
}, initialState)
export default modal