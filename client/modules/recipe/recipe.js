import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import {SERVER, headers} from "@/modules/server"

import axios from 'axios'
export const initialState = {}

const RECIPE_CREATE_REQUEST = 'recipe/RECIPE_CREATE_REQUEST';
const RECIPE_READ_REQUEST = 'recipe/RECIPE_READ_REQUEST';
const RECIPE_UPDATE_REQUEST = 'recipe/RECIPE_UPDATE_REQUEST';
const RECIPE_DELETE_REQUEST = 'recipe/RECIPE_DELETE_REQUEST';

const RECIPE_CREATE_REQUEST_SUCCESS = 'recipe/RECIPE_CREATE_REQUEST_SUCCESS';
const RECIPE_READ_REQUEST_SUCCESS = 'recipe/RECIPE_READ_REQUEST_SUCCESS';
const RECIPE_UPDATE_REQUEST_SUCCESS = 'recipe/RECIPE_UPDATE_REQUEST_SUCCESS';
const RECIPE_DELETE_REQUEST_SUCCESS = 'recipe/RECIPE_DELETE_REQUEST_SUCCESS';

const RECIPE_CREATE_REQUEST_FAILURE = 'recipe/RECIPE_CREATE_REQUEST_FAILURE';
const RECIPE_READ_REQUEST_FAILURE = 'recipe/RECIPE_READ_REQUEST_FAILURE';
const RECIPE_UPDATE_REQUEST_FAILURE = 'recipe/RECIPE_UPDATE_REQUEST_FAILURE';
const RECIPE_DELETE_REQUEST_FAILURE = 'recipe/RECIPE_DELETE_REQUEST_FAILURE';

export const recipeAddRequest = createAction(
    RECIPE_CREATE_REQUEST,
    data => data
)
export const recipeReadRequest = createAction(
    RECIPE_READ_REQUEST,
    data => data
)
export const recipeUpdateRequest = createAction(
    RECIPE_UPDATE_REQUEST,
    data => data
)
export const recipeDeleteRequest = createAction(
    RECIPE_DELETE_REQUEST,
    data => data
)
export function* recipeSaga() {
    yield takeLatest(RECIPE_CREATE_REQUEST, createRecipe);
    yield takeLatest(RECIPE_READ_REQUEST, readRecipe);
    yield takeLatest(RECIPE_UPDATE_REQUEST, updateRecipe);
    yield takeLatest(RECIPE_DELETE_REQUEST, deleteRecipe);
}
function* createRecipe(action) {
    try {
        const response = yield call(recipeCreateAPI, action.payload)
        yield put({type: RECIPE_CREATE_REQUEST_SUCCESS, payload: response.data})
        yield put((window.location.href = "/recipe"));
    } catch (error) {
        yield put({type: RECIPE_CREATE_REQUEST_FAILURE, payload: error.message})
    }
}
function* readRecipe(action) {
    try {
        const response = yield call(
            (action.payload.id === null)
                ? recipesReadAPI
                : recipeReadAPI,
            action.payload
        )
        yield put({type: RECIPE_READ_REQUEST_SUCCESS, payload: response.data})
    } catch (error) {
        yield put({type: RECIPE_READ_REQUEST_FAILURE, payload: error.message})
    }
}
function* updateRecipe(action) {
    try {
        const response = yield call(recipeUpdateAPI, action.payload)
        yield put({type: RECIPE_UPDATE_REQUEST_SUCCESS, payload: response.data})
        yield put((window.location.href = "/recipe"));
    } catch (error) {
        yield put({type: RECIPE_UPDATE_REQUEST_FAILURE, payload: error.message})
    }
}
function* deleteRecipe(action) {
    try {
        const response = yield call(recipeDeleteAPI, action.payload)
        yield put({type: RECIPE_DELETE_REQUEST_SUCCESS, payload: response.data})
        yield put((window.location.href = "/recipe"));
    } catch (error) {
        yield put({type: RECIPE_DELETE_REQUEST_FAILURE, payload: error.message})
    }
}

const recipeCreateAPI = payload => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    return axios.post(`${SERVER}/recipe`, payload, {
        headers: {
            ...headers,
            Authorization: "Bearer " + user.token
        }
    })
}
const recipeReadAPI = payload => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    return axios.get(`${SERVER}/recipe/${payload.id}`, {
        headers: {
            ...headers,
            Authorization: "Bearer " + user.token
        }
    })
}
const recipesReadAPI = () => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    return axios.get(`${SERVER}/recipe`, {
        headers: {
            ...headers,
            Authorization: "Bearer " + user.token
        }
    })
}
const recipeUpdateAPI = payload => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    console.log(payload);
    return axios.post(`${SERVER}/recipe/${payload._id}`, payload, {
        headers: {
            ...headers,
            Authorization: "Bearer " + user.token
        }
    })
}
const recipeDeleteAPI = payload => {
    const user = JSON.parse(localStorage.getItem("loginUser"));
    return axios.delete(`${SERVER}/recipe/${payload}`, {
        headers: {
            ...headers,
            Authorization: "Bearer " + user.token
        }
    })
}
const recipe = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [RECIPE_CREATE_REQUEST]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [RECIPE_READ_REQUEST]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [RECIPE_UPDATE_REQUEST]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [RECIPE_DELETE_REQUEST]: (state, action) => ({
        ...state,
        payload: action.payload
    }),
    [RECIPE_CREATE_REQUEST_SUCCESS]: (state, _action) => ({
        ...state
    }),
    [RECIPE_READ_REQUEST_SUCCESS]: (state, action) => ({
        ...state,
        data: action.payload
    }),
    [RECIPE_UPDATE_REQUEST_SUCCESS]: (state, _action) => ({
        ...state
    }),
    [RECIPE_DELETE_REQUEST_SUCCESS]: (state, _action) => ({
        ...state
    }),
    [RECIPE_CREATE_REQUEST_FAILURE]: (state, _action) => ({
        ...state
    }),
    [RECIPE_READ_REQUEST_FAILURE]: (state, _action) => ({
        ...state
    }),
    [RECIPE_UPDATE_REQUEST_FAILURE]: (state, _action) => ({
        ...state
    }),
    [RECIPE_DELETE_REQUEST_FAILURE]: (state, _action) => ({
        ...state
    })
}, initialState)

export default recipe