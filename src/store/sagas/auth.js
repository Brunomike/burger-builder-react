import {put,delay,call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as keys from "../../keys";
import axios from "axios";
import {authSuccess, checkAuthTimeout, logout} from "../actions/index";

export function* logoutSaga(action) {
    yield call([localStorage,'removeItem'],"token")
    yield call([localStorage,'removeItem'],"expirationTime")
    yield call([localStorage,'removeItem'],"userId")
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationTime');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())

}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.API_KEY
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.API_KEY
    }
    try {
        const response = yield axios.post(url, authData)
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        console.log(expirationTime*1000)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationTime', expirationTime)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
        //yield put(actions.checkAuthTimeout(expirationTime))
    } catch (err){
        yield put(actions.authFailed(err.response.data.error))
    }
}

export function * authCheckStateSaga(action){
    const token =yield localStorage.getItem('token');
    if (!token) {
        yield put(logout())
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (expirationTime <= new Date()) {
            yield put(logout())
        } else {
            const userId = localStorage.getItem('userId')
            yield put(authSuccess(token, userId))
            yield put(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 100))
        }

    }
}