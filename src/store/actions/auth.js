import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('expirationTime')
    // localStorage.removeItem('userId')

    return {
        //type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout())
    //     }, expirationTime * 1000)
    // }
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:expirationTime
    }
}

export const auth = (email, password, isSignUp) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.API_KEY
    //     if (!isSignUp) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.API_KEY
    //     }
    //     axios.post(url, authData)
    //         .then(response => {
    //             //console.log(response.data)
    //             const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //             localStorage.setItem('token', response.data.idToken)
    //             localStorage.setItem('expirationTime', expirationTime)
    //             localStorage.setItem('userId', response.data.localId)
    //             dispatch(authSuccess(response.data.idToken, response.data.localId))
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         })
    //         .catch(err => {
    //             //console.log(err.response.data.error)
    //             dispatch(authFailed(err.response.data.error))
    //         })
    //
    // }

    return{
        type:actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSignUp:isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout())
    //     } else {
    //         const expirationTime = new Date(localStorage.getItem('expirationTime'))
    //         if (expirationTime <= new Date()) {
    //             dispatch(logout())
    //         } else {
    //             const userId = localStorage.getItem('userId')
    //             dispatch(authSuccess(token, userId))
    //             dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 100))
    //         }
    //
    //     }
    // }
    return{
        type:actionTypes.AUTH_CHECK_STATE,

    }
}