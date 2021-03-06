import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import register, {registerSaga} from './auth/register';
import login, {loginSaga} from './auth/login';
import modal, {modalSaga} from './ui/modal';
import recipe, {recipeSaga} from './recipe/recipe';
import {HYDRATE} from "next-redux-wrapper"
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                return {
                    ...state,
                };
        }
    },
    login,
    register,
    recipe,
    modal
});
export function* rootSaga() {
    yield all([registerSaga(), loginSaga(), modalSaga(),recipeSaga()]);
}

export default rootReducer;